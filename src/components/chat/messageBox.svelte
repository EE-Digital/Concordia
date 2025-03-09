<script lang="ts">
	import SendButton from "~icons/lucide/send";
	import MessageList from "./messageList.svelte";
	import apiRequest from "$lib/apiRequest";
	import type { Server } from "../../types/LocalData";

	type Props = {
		server: Server;
		channelId: string;
	};

	const { server, channelId }: Props = $props();

	let message = $state("");

	const sendMessage = async () => {
		message = message.trim();
		if (message.length === 0) return;

		const data = await apiRequest(
			"POST",
			`${server.serverUrl}/channels/${channelId}/messages`,
			{
				message,
			},
			server.token,
		);

		message = "";
	};

	const enterCheck = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};
</script>

<div class="w-full px-1 flex">
	<input onkeypress={enterCheck} type="text" bind:value={message} placeholder="Type a message" class="w-full p-2 rounded bg-zinc-800 m-1 text-white" />
	<button onclick={sendMessage} class="flex flex-col justify-center items-center bg-zinc-800 w-10 h-10 rounded m-1" class:color={message.length > 0}>
		<SendButton class="text-white " />
	</button>
</div>

<style>
	.color {
		background-color: var(--accent-color);
	}
</style>
