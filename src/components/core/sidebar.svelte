<script lang="ts">
	import Settings from "../settings/settings.svelte";
	import AddServer from "./servers/addServer.svelte";
	import { serverList } from "./servers/getServers.svelte";
	import ServerWidget from "./servers/ServerWidget.svelte";
</script>

<div class="mt-2 ml-2">
	{#each serverList.servers as server}
		<ServerWidget {server} />
	{/each}
	<AddServer />
	<Settings />
</div>
