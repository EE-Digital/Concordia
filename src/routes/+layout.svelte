<script lang="ts">
	import { initDeeplinks } from "$lib/deepLink";
	import initWebSockets from "$lib/webSockets";
	import { initServerListStorage } from "../components/servers/getServers.svelte";

	initServerListStorage();
	initDeeplinks();
	initWebSockets();

	const { children } = $props();
</script>

{@render children()}
