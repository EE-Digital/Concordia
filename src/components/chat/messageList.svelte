<script lang="ts">
	import type { Message as MessageType } from "../../types/Message";
	import Attachment from "./attachment.svelte";
	import Message from "./message.svelte";

	type Props = {
		messages: MessageType[];
	};
	const { messages }: Props = $props();
</script>

{#each messages as message, index}
	{#if message.file}
		<Attachment {message} hideAuthor={!(index === 0 || message.author.id !== messages[index - 1]?.author.id)} />
	{:else}
		<Message {message} hideAuthor={!(index === 0 || message.author.id !== messages[index - 1]?.author.id)} />
	{/if}
{/each}
