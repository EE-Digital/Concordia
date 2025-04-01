<script lang="ts">
	import { readImage } from "@tauri-apps/plugin-clipboard-manager";
	import type { Server } from "../../types/LocalData";
	import EmojiKeyboard from "../emoji/EmojiKeyboard.svelte";
	import Attachment from "./attachment.svelte";
	import SendButton from "~icons/lucide/send";
	import IconFile from "~icons/lucide/file";
	import IconImage from "~icons/lucide/image";
	import IconPool from "~icons/lucide/chart-pie";
	import IconSwords from "~icons/lucide/swords";
	import IconEmoji from "~icons/lucide/smile";
	import CreatePoll from "./CreatePoll.svelte";

	type Props = {
		server: Server;
		channelId: string;
	};

	const { server, channelId }: Props = $props();

	let isEmojiKeyboardVisible = $state(false);
	let isPollEditorVisible = $state(false);
	let message = $state("");
	let inputElement: HTMLInputElement;
	let attachments: File[] = $state([]);


	const sendMessageRaw = async (data: FormData) => {
		const response = await fetch(`${server.serverUrl}/channels/${channelId}/messages`, {
			method: "POST",
			headers: {
				authorization: server.token,
			},
			body: data,
		});
		return response;
	}

	const sendMessage = async () => {
		message = message.trim();
		if (message.length === 0 && attachments.length === 0) return;
		if (isEmojiKeyboardVisible) isEmojiKeyboardVisible = false;
		const formData = new FormData();

		formData.append("message", message);
		attachments.forEach((file) => formData.append("file", file));

		const response = await sendMessageRaw(formData);

		attachments = [];
		message = "";
		if (response.status != 200) console.error("Failed sending message");
	};

	const sendPoll = async (question: string, options: string[], isMultiple: boolean) => {
		if (isPollEditorVisible) isPollEditorVisible = false;
		const formData = new FormData();
		formData.append("poll", JSON.stringify({ question, options, isMultiple }));
		const response = await sendMessageRaw(formData);
		return response.status === 200;
	}

	const enterCheck = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault();
			sendMessage();
		}
	};

	const createPoll = () => {
		if (isPollEditorVisible) return;
		isPollEditorVisible = true;
	};

	let fileInput: HTMLInputElement;
	const triggerAttachment = () => {
		fileInput.click();
	};

	const handleAttachment = async (e: any) => {
		const files: File[] = Array.from(e.target.files);
		files.forEach((file) => attachments.push(file));
		attachments = attachments; // Trigger reactivity
		console.log(attachments);
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

	async function handlePasteImage(e: KeyboardEvent) {
		if (e.key !== "v" || !e.ctrlKey) return;

		try {
			// Load the image from the clipboard
			const image = await readImage();
			if (!image) return;
			const size = await image.size();
			const pixelData = await image.rgba();

			// Redraw data into image
			const drawCanvas = document.createElement("canvas");
			drawCanvas.width = size.width;
			drawCanvas.height = size.height;
			const ctx = drawCanvas.getContext("2d");
			if (!ctx) return;
			const imageData = ctx.createImageData(size.width, size.height);
			imageData.data.set(pixelData);
			ctx.putImageData(imageData, 0, 0);

			// Convert image to PNG image
			const blobData: Blob = await new Promise((resolve) => drawCanvas.toBlob(resolve as BlobCallback, "image/png"));
			const file = new File([blobData], "clipboard.png", { type: "image/png" });

			// Push to upload file list
			attachments.push(file);
			attachments = attachments; // Trigger reactivity
		} catch (e) {}
	}
</script>

<div class="w-full px-1 flex pr-5 relative">
	<!-- Do not delete, used for getting Attachment -->
	<input type="file" bind:this={fileInput} style="display:none;" onchange={handleAttachment} multiple />
	<div class="w-full flex flex-col overflow-hidden">
		<!-- Message Box -->
		<div class="w-full flex flex-col bg-zinc-800 rounded-lg">
			<!-- Attachment list -->
			{#if attachments.length > 0}
				<div class="w-full flex pt-2 px-4 gap-2 overflow-x-auto">
					{#each attachments as attachment}
						<Attachment
							{attachment}
							remove={() => {
								attachments = attachments.filter((file) => file !== attachment);
							}}
						/>
					{/each}
				</div>
			{/if}

			<!-- Send message -->
			<div class="w-full flex">
				<input onkeypress={enterCheck} type="text" bind:value={message} bind:this={inputElement} placeholder="Type a message" class="w-full px-4 py-2 text-white outline-0" onkeydown={handlePasteImage} />
				<button onclick={toggleEmojiKeyboard} class="flex flex-col justify-center items-center cursor-pointer hover:text-white">
					<IconEmoji />
				</button>
				<button onclick={sendMessage} class="flex flex-col justify-center items-center bg-zinc-800 w-10 h-10 rounded m-1" class:color={message.length > 0 || attachments.length > 0}>
					<SendButton class="text-white cursor-pointer" />
				</button>
			</div>
		</div>

		<!-- Tools -->
		<div class="flex gap-2 px-0 py-2">
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("TODO")}>
				<IconImage />
				GIF
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={createPoll}>
				<IconPool />
				Poll
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={() => console.log("TODO")}>
				<IconSwords />
				Game
			</button>
			<button class="border-1 border-dashed rounded-full flex px-3 py-1 text-xs gap-2 items-center cursor-pointer text-neutral-300 hover:text-white hover:bg-zinc-900" onclick={triggerAttachment}>
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

	<!-- Poll Editor -->
	{#if isPollEditorVisible}
		<CreatePoll bind:open={isPollEditorVisible} onsubmit={sendPoll} />
	{/if}
</div>

<style>
	.color {
		background-color: var(--accent-color);
	}
</style>
