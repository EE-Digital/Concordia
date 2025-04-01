<script lang="ts">
	import { parseMarkdownToHtml } from "$lib/markdown";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import type { Message as MessageType } from "../../types/Message";

	import IconLink from "~icons/lucide/square-arrow-out-up-right";
	import IconFile from "~icons/lucide/file";

	type Props = {
		message: MessageType;
		hideAuthor?: boolean;
	};

	const { message, hideAuthor = false }: Props = $props();

	const parsedMessage = $derived(parseMarkdownToHtml(message.text as string));
	const isEmpty = $derived(message.text === undefined || message.text.length === 0);

	function timeString(date: Date) {
		return date.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	function fullTimeString(date: Date) {
		const today = new Date();
		const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
		if (isToday) {
			return timeString(date);
		}
		const isYesterday = date.getDate() === today.getDate() - 1 && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
		if (isYesterday) {
			return "yesterday " + timeString(date);
		}

		const dateString = date.toLocaleDateString([], {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});
		return dateString + " " + timeString(date);
	}
</script>

<div class="mx-2 pl-2.5 rounded group">
	<!-- Author -->
	{#if !hideAuthor}
		<div class="flex items-center pt-3 mb-1 gap-2">
			{#if message.author.profileUrl}
				<img src={message.author.profileUrl} alt="" />
			{:else}
				<div class="w-8 h-8 rounded flex items-center justify-center font-bold bg-purple-700">
					{message.author.name.slice(0, 2)}
				</div>
			{/if}
			<div class="flex items-baseline gap-1">
				<div class="font-semibold">{message.author.name}</div>
				<div class="text-neutral-400 text-xs mr-2">
					{fullTimeString(new Date(message.createdAt))}
				</div>
			</div>
		</div>
	{/if}

	<!-- Message -->
	<div class="flex justify-between">
		<div class="text-neutral-200">{@html parsedMessage}</div>
		{#if !isEmpty}
			<div class="text-neutral-400 text-xs mr-2 mt-1 invisible group-hover:visible">
				{timeString(new Date(message.createdAt))}
			</div>
		{/if}
	</div>

	<!-- Files -->
	<div class="flex flex-col gap-2 mb-1">
		{#each message.files as file}
			{#if file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/webp"}
				<img src={file.url} class="max-h-80 max-w-80 rounded object-cover" alt={file.filename} />
			{:else}
				<div class="bg-zinc-800 p-3 rounded w-min flex items-center gap-2">
					<IconFile />
					<div>{file.filename}</div>
					<button
						class="p-2 px-3 ml-2 rounded bg-zinc-900 hover:bg-(--accent-color) cursor-pointer flex gap-2 items-center"
						onclick={() => {
							openUrl(file.url);
						}}
					>
						Open
						<IconLink class="text-sm" />
					</button>
				</div>
			{/if}
		{/each}
	</div>

	<!-- Polls -->
	{#if message.polls.length > 0}
		<div class="flex flex-col gap-2 mb-1">
			{#each message.polls as poll}
				<div class="bg-zinc-900 p-3 rounded flex flex-col gap-2">
					<div>
						<div class="text-xs text-neutral-400">Poll by <span class="hover:underline hover:text-neutral-300 cursor-pointer">{message.author.name}</span></div>
						<div class="text-xl font-bold">{poll.title}</div>
					</div>
					<div class="flex flex-col gap-2">
						{#each poll.options as option}
							<button class="bg-zinc-800 px-3 py-2 rounded text-left cursor-pointer hover:bg-zinc-700" >
								{option.title}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
