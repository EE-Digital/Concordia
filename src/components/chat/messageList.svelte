<script lang="ts">
	import type { Message as MessageType } from "../../types/Message";
	import Message from "./message.svelte";

	type Props = {
		messages: MessageType[];
	};
	const { messages }: Props = $props();
</script>

{#each messages as message, index (message.id)}
	{@const dateDiffer = index === 0 || new Date(message.createdAt).toDateString() !== new Date(messages[index - 1].createdAt).toDateString()}
	{@const authorDiffer = index === 0 || message.author.id !== messages[index - 1]?.author.id}
	{#if dateDiffer}
		{@const dateTimeString = new Date(message.createdAt).toLocaleDateString([], {
			year: "numeric",
			month: "long",
			day: "2-digit",
		})}
		<div class="flex flex-col justify-center h-6 relative items-center mt-2 mb-1">
			<div class="w-full border-b-1 border-dashed border-neutral-800 absolute"></div>
			<div class="text-center text-xs font-semibold px-4 bg-neutral-800 text-neutral-400 rounded-full w-fit h-6 flex items-center z-10">
				{dateTimeString}
			</div>
		</div>
	{/if}
	<Message {message} hideAuthor={!authorDiffer && !dateDiffer} />
{/each}
