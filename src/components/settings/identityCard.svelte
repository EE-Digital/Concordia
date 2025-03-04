<script lang="ts">
	import type { Server } from "../../types/LocalData";
	import { serverList } from "../servers/getServers.svelte";

	type Props = {
		server: Server;
	};

	const { server }: Props = $props();

	const handleDelete = () => {
		const newServers = serverList.servers.filter((s) => s.token !== server.token);
		serverList.servers = newServers;

		// TODO request deletion of token from server

		localStorage.setItem("servers", JSON.stringify(newServers));
	};
</script>

<div class="flex flex-col justify-center items-center rounded-lg p-1.5 px-3 min-w-32 m-2">
	<img src={server.iconUrl} alt="Server Icon" class="rounded-lg w-20 h-20 object-cover mb-2" />
	<h1 class="font-bold">{server.name}</h1>
	<h2>{server.username}</h2>

	<div class="flex w-full mt-2">
		<button onclick={handleDelete} class="w-full rounded-lg px-2 cursor-pointer mx-1">Delete</button>
	</div>
</div>

<style>
	div {
		background-color: #2f2f2f;
	}

	button {
		background-color: var(--background-color);
	}

	button:hover {
		background-color: red;
	}
</style>
