<script lang="ts">
	import SendButton from "~icons/lucide/send";
	import MessageList from "./messageList.svelte";
	import apiRequest from "$lib/apiRequest";
	import type { Server } from "../../types/LocalData";
	import IconFile from "~icons/lucide/file";
	import IconImage from "~icons/lucide/image";
	import IconPool from "~icons/lucide/chart-pie";
	import IconSwords from "~icons/lucide/swords";

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
			e.preventDefault();
			sendMessage();
		}
	};
</script>

<div class="w-full px-1 fleex pr-5 pt-2">
	<div class="w-full flex flex-col overflow-hidden">
		<!-- Message Box -->
		<div class="w-full flex bg-zinc-800 rounded-lg">
			<input onkeypress={enterCheck} type="text" bind:value={message} placeholder="Type a message" class="w-full px-4 py-2 text-white outline-0" />
			<button onclick={sendMessage} class="flex flex-col justify-center items-center bg-zinc-800 w-10 h-10 rounded m-1" class:color={message.length > 0}>
				<SendButton class="text-white cursor-pointer" />
			</button>
		</div>

		<!-- Tools -->
		<div class="flex gap-2 px-0 py-2">
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("Not implemented yet")}>
				<IconImage />
				GIF
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("Not implemented yet")}>
				<IconPool />
				Poll
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("Not implemented yet")}>
				<IconSwords />
				Game
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("Not implemented yet")}>
				<IconFile />
				Attachment
			</button>
		</div>
	</div>
</div>

<style>
	.color {
		background-color: var(--accent-color);
	}
</style>
