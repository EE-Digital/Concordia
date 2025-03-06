<script lang="ts">
	import { initDeeplinks } from "$lib/deepLink";
	import { initServerListStorage } from "../components/servers/getServers.svelte";

	initServerListStorage();
	initDeeplinks();

	const { children } = $props();
</script>

{@render children()}
