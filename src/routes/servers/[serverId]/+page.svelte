<script lang="ts">
	import { onMount } from "svelte";
	import type { Server } from "../../../types/LocalData";
	import Settings from "~icons/lucide/chevron-down";
	import { loadServer } from "./serverCache";
	import type { Message } from "../../../types/Message";
	let server: Server | undefined = $state(undefined);
	let selectedChannel: string | undefined = $state(undefined);
	let messages: Awaited<Message[]> = $state([]);

	onMount(async () => {
		let servers: Server[] = JSON.parse(localStorage.getItem("servers") ?? "{}");

		const serverId = parseInt(window.location.href.toString().split("/").pop() ?? "");

		let selectedServer;
		if (serverId != -1) selectedServer = servers.find((server) => server.id === serverId);
		else selectedServer = servers[0];

		if (selectedServer) {
			selectedServer = await loadServer(selectedServer);
		}

		server = selectedServer;
		selectedChannel = selectedServer?.channels[0].id;

		if (selectedChannel) messages = await getMessages(selectedServer!, selectedChannel);
	});

	function handleServerEdit() {
		// window.location.href = `/servers/${(server as Server).id}/edit`;
	}

	async function getMessages(server: Server, channelId: string) {
		try {
			const response = await fetch(`${server!.serverUrl}/channels/${channelId}/messages`, {
				headers: {
					Authorization: server!.token,
				},
			});
			const newMessages: Message[] = await response.json();
			return newMessages;
		} catch (e) {
			console.error(e);
		}
		return [];
	}

	async function selectChannel(channelId: string) {
		messages = await getMessages(server!, channelId);
		selectedChannel = channelId;
	}
</script>

{#if server == undefined}
	<div class="w-full h-full flex flex-col justify-center items-center">
		<h1 class="font-bold">No server found!</h1>
		<h2>Please join a server to use the app</h2>
	</div>
{/if}

{#if server !== undefined}
	<div class="flex h-full w-full">
		<div id="sidebar" class="min-w-40 w-40">
			<button onclick={handleServerEdit} class="font-semibold h-12 w-full cursor-pointer flex justify-center items-center mx-1">
				{(server as Server).name}
				<Settings class="ml-1.5" />
			</button>
			{#each server.channels as channel}
				<button onclick={() => selectChannel(channel.id)} style={channel.id === selectedChannel ? "background-color: #FFFFFF33;" : ""} class="cursor-pointer w-full rounded py-1 my-1 mx-1">{channel.title}</button>
			{/each}
		</div>
		<div class="h-full w-full">
			{#if server.channels.length <= 0}
				<div class="flex flex-col justify-center content-center w-full h-full">
					<h1 class="text-center font-bold">No channels found</h1>
					<h2 class="text-center">Please contact the server administrator if you believe this to be wrong</h2>
				</div>
			{/if}
			{#each messages as message}
				<div class="m-2 p-2 rounded" style="background-color: #ffffff12;">
					<div class="flex items-center">
						{#if message.author.profileUrl}
							<img src={message.author.profileUrl} alt="" />
						{:else}
							<div class="w-8 h-8 rounded flex items-center justify-center font-bold bg-purple-700">
								{message.author.name.slice(0, 2)}
							</div>
						{/if}
						<h1 class="ml-2">{message.author.name}</h1>
					</div>
					<p>{message.text}</p>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
</style>
