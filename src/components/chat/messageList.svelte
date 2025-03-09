<script lang="ts">
	import type { Message } from "../../types/Message";

	type Props = {
		messages: Message[];
	};
	const { messages }: Props = $props();
</script>

{#each messages as message, index}
	<div class="mx-2 rounded">
		{#if index === 0 || message.author.id !== messages[index - 1]?.author.id}
			<div class="flex items-center mt-2">
				{#if message.author.profileUrl}
					<img src={message.author.profileUrl} alt="" />
				{:else}
					<div class="w-8 h-8 rounded flex items-center justify-center font-bold bg-purple-700">
						{message.author.name.slice(0, 2)}
					</div>
				{/if}
				<h1 class="ml-2">{message.author.name}</h1>
			</div>
		{/if}
		<p>{message.text}</p>
	</div>
{/each}
