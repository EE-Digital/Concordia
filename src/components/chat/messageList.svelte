<script lang="ts">
	const { messages } = $props();
</script>

{#each messages as message}
	<div class="m-2 p-2 rounded" style="background-color: #ffffff12;">
		<div class="flex items-center">
			{#if message.author.profileUrl}
				<img src={message.author.profileUrl} alt="" />
			{:else}
				<div class="w-8 h-8 rounded flex items-center justify-center font-bold bg-purple-700">
					{message.author.name.slice(0, 2)}
				</div>
			{/if}
			<h1 class="ml-2">{message.author.name}</h1>
		</div>
		<p>{message.text}</p>
	</div>
{/each}
