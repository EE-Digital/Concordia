<script lang="ts">
	import IconTextBubble from "~icons/lucide/message-square";
	import IconTextBubbleWriting from "~icons/lucide/message-square-more";

	let { channels, selectChannel, selectedChannel } = $props();
	let newMessageCount = 0; // TODO
	let isSomeoneTyping = false; // TODO

	const ChatIcon = $derived(isSomeoneTyping ? IconTextBubbleWriting : IconTextBubble);
</script>

{#each channels as channel}
	<button onclick={() => selectChannel(channel.id)} class="flex items-center p-2 gap-2 cursor-pointer w-full rounded py-1 my-1 {channel.id === selectedChannel ? 'bg-[#FFFFFF33]' : 'hover:bg-[#ffffff11]'}">
		<ChatIcon class="w-5 h-5 mt-0.5 text-sm text-neutral-400" />
		<div class="capitalize">
			{channel.title}
		</div>
		{#if newMessageCount > 0}
			<div class="ml-auto text-xs bg-(--accent-color) w-2 h-2 rounded-full animate-pulse"></div>
		{/if}
	</button>
{:else}
	<div class="flex flex-col h-full w-full justify-center align-center">
		<h1 class="text-center font-semibold">No channels found</h1>
	</div>
{/each}
