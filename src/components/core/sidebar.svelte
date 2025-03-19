<script lang="ts">
	import Settings from "../settings/settings.svelte";
	import AddServer from "../servers/add/addServer.svelte";
	import { serverList } from "../servers/getServers.svelte";
	import ServerWidget from "../servers/ServerWidget.svelte";
</script>

<div class="pt-2 pl-2 pr-2 border-r-2 border-zinc-900 bg-zinc-900 gap-1.5 flex flex-col">
	{#each serverList.servers as server}
		<ServerWidget {server} />
	{/each}
	<AddServer />
	<Settings />
</div>
