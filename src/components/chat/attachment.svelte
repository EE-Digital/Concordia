<script lang="ts">
	import type { Message as MessageType } from "../../types/Message";

	import { openUrl } from "@tauri-apps/plugin-opener";

	type Props = {
		message: MessageType;
		hideAuthor?: boolean;
	};

	const { message, hideAuthor = false }: Props = $props();

	const handleClick = async () => {
		await openUrl(message.file!.path);
	};
</script>

<div class="mx-2 pl-2.5 rounded hover:bg-neutral-900">
	{#if !hideAuthor}
		<div class="flex items-center mt-3 mb-1">
			{#if message.author.profileUrl}
				<img src={message.author.profileUrl} alt="" />
			{:else}
				<div class="w-8 h-8 rounded flex items-center justify-center font-bold bg-purple-700">
					{message.author.name.slice(0, 2)}
				</div>
			{/if}
			<h1 class="ml-2 font-semibold">{message.author.name}</h1>
		</div>
	{/if}
	{#if message.file?.mimetype === "image/jpeg" || message.file?.mimetype === "image/png" || message.file?.mimetype === "image/webp"}
		<img src={`${message.file?.path}`} class="max-h-80 max-w-80 rounded my-1" alt="" />
	{:else}
		<div class="bg-zinc-800 p-3 rounded w-min flex items-center">
			<h1>{message.file?.filename}</h1>
			<button class="ml-5 p-2 px-3 rounded bg-zinc-900 cursor-pointer" onclick={handleClick}>Open</button>
		</div>
	{/if}
</div>
