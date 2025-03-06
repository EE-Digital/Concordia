<script lang="ts">
	import { onMount } from "svelte";
	import { serverList } from "../components/servers/getServers.svelte";
	import { goto } from "$app/navigation";
	import { listIdentities } from "$lib/identityManagement";
	import Loading from "../components/core/loading.svelte";

	onMount(() => {
		if (listIdentities().length === 0) return goto("/setup");
		if (serverList.servers.length === 0) return goto("/servers");
		const serverId = serverList.servers[0].id;
		goto(`/servers/${serverId}`);
	});
</script>

<div class="center">
	<div class="image">
		<h1>Logo</h1>
	</div>
	<div class="mt-2">
		<Loading />
	</div>
</div>

<style>
	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.image {
		width: 80px;
		height: 80px;
		background: var(--color);
		border-radius: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image h1 {
		color: #0f0f0f;
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
