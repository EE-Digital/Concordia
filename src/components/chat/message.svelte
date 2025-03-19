<script lang="ts">
	import { parseMarkdownToHtml } from "$lib/markdown";
	import type { Message as MessageType } from "../../types/Message";

	type Props = {
		message: MessageType;
		hideAuthor?: boolean;
	};

	const { message, hideAuthor = false }: Props = $props();
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

	<div class="text-neutral-200">{@html parseMarkdownToHtml(message.text)}</div>
</div>
