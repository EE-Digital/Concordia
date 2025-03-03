<script lang="ts">
	import { onMount } from "svelte";
	import type { Server } from "../../../types/LocalData";
	import Settings from "~icons/lucide/bolt";
	import { loadServer } from "./serverCache";
	let server: Server | undefined = $state(undefined);

	onMount(async () => {
		let servers: Server[] = JSON.parse(localStorage.getItem("servers") ?? "{}");

		const serverId = parseInt(window.location.href.toString().split("/").pop() ?? "");

		let selectedServer;
		if (serverId != -1) selectedServer = servers.find((server) => server.id === serverId);
		else selectedServer = servers[0];

		if (selectedServer) {
			selectedServer = await loadServer(selectedServer);
		}

		server = selectedServer;
	});

	function handleServerEdit() {
		// window.location.href = `/servers/${(server as Server).id}/edit`;
	}
</script>

{#if server == undefined}
	<div class="w-full h-full flex flex-col justify-center items-center">
		<h1 class="font-bold">No server found!</h1>
		<h2>Please join a server to use the app</h2>
	</div>
{/if}

{#if server !== undefined}
	<div class="flex h-full w-full">
		<div id="sidebar">
			<button onclick={handleServerEdit} class="font-semibold h-12 w-44 cursor-pointer flex justify-around items-center">{(server as Server).name} <Settings /></button>
			{#each server.channels as channel}
				<button class="w-full rounded py-1 my-1">{channel.title}</button>
			{/each}
		</div>
		<div class="h-full w-full">
			{#if server.channels.length <= 0}
				<div class="flex flex-col justify-center content-center w-full h-full">
					<h1 class="text-center font-bold">No channels found</h1>
					<h2 class="text-center">Please contact the server administrator if you believe this to be wrong</h2>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
</style>
