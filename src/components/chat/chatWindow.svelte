<script lang="ts">
	import MessageList from "./messageList.svelte";

	const { messages } = $props();
</script>

<div class="h-full w-full">
	<MessageList {messages} />
</div>
