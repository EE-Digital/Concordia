<script lang="ts">
	import SendButton from "~icons/lucide/send";
	import apiRequest from "$lib/apiRequest";
	import type { Server } from "../../types/LocalData";
	import IconFile from "~icons/lucide/file";
	import IconImage from "~icons/lucide/image";
	import IconPool from "~icons/lucide/chart-pie";
	import IconSwords from "~icons/lucide/swords";
	import IconEmoji from "~icons/lucide/smile";
	import EmojiKeyboard from "../emoji/EmojiKeyboard.svelte";

	type Props = {
		server: Server;
		channelId: string;
	};

	const { server, channelId }: Props = $props();

	let isEmojiKeyboardVisible = $state(false);
	let message = $state("");
	let inputElement: HTMLInputElement;

	const sendMessage = async () => {
		message = message.trim();
		if (message.length === 0) return;
		if (isEmojiKeyboardVisible) isEmojiKeyboardVisible = false;

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

	let fileInput: HTMLInputElement;
	const trrigetAttachment = () => {
		fileInput.click();
	};

	const handleAttachment = async (e: any) => {
		const file = e.target.files[0];
		console.log(file);
		if (!file) return;

		const data = new FormData();
		data.append("f", file);

		const response = await fetch(`${server.serverUrl}/channels/${channelId}/messages/attachment`, {
			method: "POST",
			headers: {
				authorization: server.token,
			},
			body: data,
		});
		if (response.status != 200) console.error("Failed sending attachment");
	};

	let lastCursorPos = 0;
	let lastCursorPosEnd = 0;
	const toggleEmojiKeyboard = () => {
		if (!isEmojiKeyboardVisible) {
			lastCursorPos = inputElement.selectionStart || 0;
			lastCursorPosEnd = inputElement.selectionEnd || 0;
		} else {
			setTimeout(() => {
				inputElement.focus();
				inputElement.setSelectionRange(lastCursorPos, lastCursorPosEnd);
			}, 0);
		}

		isEmojiKeyboardVisible = !isEmojiKeyboardVisible;
	};
	const closeEmojiKeyboard = () => {
		if (isEmojiKeyboardVisible) toggleEmojiKeyboard();
	};
	const insertEmoji = (emoji: string, close: boolean) => {
		const insertSpaceOnEnd = lastCursorPos === lastCursorPosEnd && lastCursorPos === message.length;
		if (insertSpaceOnEnd) emoji += " ";
		message = message.slice(0, lastCursorPos) + emoji + message.slice(lastCursorPosEnd);
		lastCursorPos += emoji.length;
		lastCursorPosEnd = lastCursorPos;

		if (close) closeEmojiKeyboard();
	};
</script>

<div class="w-full px-1 flex pr-5 relative">
	<!-- Do not delete, used for getting Attachment -->
	<input type="file" bind:this={fileInput} style="display:none;" onchange={handleAttachment} max="1" />
	<div class="w-full flex flex-col overflow-hidden">
		<!-- Message Box -->
		<div class="w-full flex bg-zinc-800 rounded-lg">
			<input onkeypress={enterCheck} type="text" bind:value={message} bind:this={inputElement} placeholder="Type a message" class="w-full px-4 py-2 text-white outline-0" />
			<button onclick={toggleEmojiKeyboard} class="flex flex-col justify-center items-center cursor-pointer hover:text-white">
				<IconEmoji />
			</button>
			<button onclick={sendMessage} class="flex flex-col justify-center items-center bg-zinc-800 w-10 h-10 rounded m-1" class:color={message.length > 0}>
				<SendButton class="text-white cursor-pointer" />
			</button>
		</div>

		<!-- Tools -->
		<div class="flex gap-2 px-0 py-2">
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("TODO")}>
				<IconImage />
				GIF
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("TODO")}>
				<IconPool />
				Poll
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("TODO")}>
				<IconSwords />
				Game
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={trrigetAttachment}>
				<IconFile />
				Attachment
			</button>
		</div>
	</div>

	<!-- Emoji Keyboard -->
	{#if isEmojiKeyboardVisible}
		<div class="absolute right-5 -top-1 transfrom -translate-y-full h-100">
			<EmojiKeyboard onselect={insertEmoji} close={closeEmojiKeyboard} />
		</div>
	{/if}
</div>

<style>
	.color {
		background-color: var(--accent-color);
	}
</style>
