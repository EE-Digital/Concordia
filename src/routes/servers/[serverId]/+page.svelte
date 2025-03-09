<script lang="ts">
	import type { Server } from "../../../types/LocalData";
	import type { Message } from "../../../types/Message";
	import Settings from "~icons/lucide/chevron-down";
	import { getChannels, getChannelsCached } from "./serverCache";
	import ChatWindow from "../../../components/chat/chatWindow.svelte";
	import ChannelList from "../../../components/server/channelList.svelte";
	import { goto } from "$app/navigation";
	import { serverList } from "../../../components/servers/getServers.svelte";
	import { page } from "$app/state";
	import MessageBox from "../../../components/chat/messageBox.svelte";
	import { activeChannel, messages } from "../../../components/store.svelte";
	let server: Server | undefined = $state(undefined);
	// let messages: Awaited<Message[]> = $state([]);
	let lastParam: number = -1;
	const servers: Server[] = serverList.servers;

	$effect(() => {
		getData(parseInt(page.params.serverId));
	});

	async function getData(serverId: number) {
		// Prevents infinite loop
		if (lastParam === serverId) return;
		lastParam = serverId;

		// Make sure we have servers
		if (servers.length === 0) return goto("/servers");

		// Get the selected server
		const selectedServer = servers.find((server) => server.id == serverId) ?? servers[0];
		if (!selectedServer) return goto("/servers");

		// Get the channels
		selectedServer.channels = (await getChannels(selectedServer)) ?? [];

		// Update the state
		server = selectedServer;
		activeChannel.channelId = selectedServer?.channels[0]?.id;

		// If we got a  channel, get the messages
		if (activeChannel.channelId) messages.messages = await getMessages(selectedServer!, activeChannel.channelId);
		return 0;
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
			console.log(newMessages);

			return newMessages;
		} catch (e) {
			console.error(e);
		}
		return [];
	}

	async function selectChannel(channelId: string) {
		messages.messages = await getMessages(server!, channelId);
		activeChannel.channelId = channelId;
	}
</script>

{#if server !== undefined}
	<div class="flex h-full w-full">
		<div id="sidebar" class="min-w-40 w-40">
			<button onclick={handleServerEdit} class="font-semibold h-12 w-full cursor-pointer flex justify-center items-center mx-1">
				{(server as Server).name}
				<Settings class="ml-1.5" />
			</button>
			<ChannelList channels={server!.channels} {selectChannel} selectedChannel={activeChannel.channelId} />
		</div>
		{#if activeChannel.channelId}
			<div class="flex flex-col w-full">
				<ChatWindow messages={messages.messages} />
				<MessageBox {server} channelId={activeChannel.channelId} />
			</div>
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
