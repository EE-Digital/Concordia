<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	import type { Server } from "../../types/LocalData";

	type Props = {
		server: Server;
	};

	const { server }: Props = $props();
	const changeServer = () => {
		goto("/servers/" + server.id);
	};
</script>

<button class="cursor-pointer" onclick={changeServer}>
	<div class="w-full h-full">
		{#if server.iconUrl}
			<img src={server.iconUrl} alt={server.name} />
		{:else}
			<div class="flex items-center justify-center bg-teal-500 text-white font-bold rounded w-full h-full">
				<p class="text-center">
					{server.name[0]}{server.name[1].toLowerCase()}
				</p>
			</div>
		{/if}
	</div>
</button>

<style>
	button {
		width: 2rem;
		height: 2rem;
		margin-bottom: 0.5rem;
		display: flex;
		overflow: hidden;
	}

	img {
		display: flex;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		overflow: hidden;
		object-fit: cover;
	}
</style>
