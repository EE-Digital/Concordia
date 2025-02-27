<script lang="ts">
	import Settings from "../settings.svelte";
	import AddServer from "./addServer.svelte";
	import { serverList } from "./getServers.svelte";
	import ServerWidget from "./ServerWidget.svelte";
</script>

<main>
	{#each serverList.servers as server}
		<ServerWidget {server} />
	{/each}
	<AddServer />
	<Settings />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
	}
</style>
