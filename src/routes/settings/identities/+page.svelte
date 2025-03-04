<script lang="ts">
	import { onMount } from "svelte";
	import { serverList } from "../../../components/servers/getServers.svelte";
	import IdentityCard from "../../../components/settings/identityCard.svelte";

	onMount(() => {
		console.log(serverList.servers);
	});
</script>

<div class="ml-2 mt-2 flex flex-wrap">
	{#each serverList.servers as server}
		<IdentityCard {server} />
	{/each}
</div>
