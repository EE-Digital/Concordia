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
	<div>
		<img src={server.iconUrl} alt={server.name} />
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
