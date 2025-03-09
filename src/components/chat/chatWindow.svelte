<script lang="ts">
	import MessageList from "./messageList.svelte";

	const { messages } = $props();
</script>

<div class="flex flex-col h-full w-full justify-end">
	{#if messages.length === 0}
		<div class="flex flex-col justify-center align-center h-full w-full">
			<p class="text-center text-white">There's no messages here yet</p>
		</div>
	{/if}
	<MessageList {messages} />
</div>
