<script lang="ts">
	import { onMount } from "svelte";
	import MessageList from "./messageList.svelte";

	const { messages } = $props();

	let messageContainer: HTMLDivElement | null = null;

	$effect(() => {
		if (messageContainer && messages.length > 0) {
			messageContainer.scrollTo(0, messageContainer.scrollHeight);
		}
	});
</script>

<div class="flex flex-col h-full w-full justify-end max-h-screen overflow-auto">
	{#if messages.length === 0}
		<div class="flex flex-col justify-center align-center h-full w-full">
			<p class="text-center text-white">There's no messages here yet</p>
		</div>
	{/if}
	<div class="overflow-y-auto" bind:this={messageContainer}>
		<MessageList {messages} />
	</div>
</div>
