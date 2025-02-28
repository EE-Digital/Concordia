<script lang="ts">
	import Settings from "../settings.svelte";
	import AddServer from "./addServer.svelte";
	import { serverList } from "./getServers.svelte";
	import ServerWidget from "./ServerWidget.svelte";
</script>

<div class="mt-2 ml-2">
	{#each serverList.servers as server}
		<ServerWidget {server} />
	{/each}
	<AddServer />
	<Settings />
</div>
