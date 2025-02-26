<script lang="ts">
	import AddServer from "./addServer.svelte";
	import { serverList } from "./getServers.svelte";
	import ServerWidget from "./ServerWidget.svelte";
</script>

<main>
	{#each serverList.servers as server}
		<ServerWidget {server} />
	{/each}
	<AddServer />
</main>
