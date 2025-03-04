<script lang="ts">
	import type { Server } from "../../../types/LocalData";
	import type { Message } from "../../../types/Message";
	import { onMount } from "svelte";
	import Settings from "~icons/lucide/chevron-down";
	import { loadServer } from "./serverCache";
	import ChatWindow from "../../../components/chat/chatWindow.svelte";
	import ChannelList from "../../../components/server/channelList.svelte";
	import { goto } from "$app/navigation";
	let server: Server | undefined = $state(undefined);
	let selectedChannel: string | undefined = $state(undefined);
	let messages: Awaited<Message[]> = $state([]);

	const { data } = $props() as { data: { serverId: number } };

	$effect(() => {
		getData(data.serverId);
	});

	onMount(() => {
		getData(data.serverId);
	});

	async function getData(serverId: number) {
		let servers: Server[] = JSON.parse(localStorage.getItem("servers") ?? "{}");

		let selectedServer;
		if (serverId != -1) selectedServer = servers.find((server) => server.id == serverId);
		else if (servers.length > 0) selectedServer = servers[0];
		else goto("/servers");

		if (selectedServer) {
			selectedServer = await loadServer(selectedServer);
		}

		server = selectedServer;
		selectedChannel = selectedServer?.channels[0].id;

		if (selectedChannel) messages = await getMessages(selectedServer!, selectedChannel);
	}

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

{#if server !== undefined}
	<div class="flex h-full w-full">
		<div id="sidebar" class="min-w-40 w-40">
			<button onclick={handleServerEdit} class="font-semibold h-12 w-full cursor-pointer flex justify-center items-center mx-1">
				{(server as Server).name}
				<Settings class="ml-1.5" />
			</button>
			<ChannelList channels={server.channels} {selectChannel} {selectedChannel} />
		</div>
		{#if selectedChannel}
			<ChatWindow {messages} />
		{:else}
			<div class="flex flex-col justify-center content-center w-full h-full">
				<h1 class="text-center font-bold">No channels found</h1>
				<h2 class="text-center">Please contact the server administrator if you believe this to be wrong</h2>
			</div>
		{/if}
	</div>
{/if}

<style>
</style>
