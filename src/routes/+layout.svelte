<script lang="ts">
	import { initDeeplinks } from "$lib/deepLink";
	import { prefetchAllEmojis } from "$lib/emoji";
	import initWebSockets from "$lib/webSockets";
	import { initServerListStorage } from "../components/servers/getServers.svelte";

	initServerListStorage();
	initDeeplinks();
	initWebSockets();
	prefetchAllEmojis();

	const { children } = $props();
</script>

{@render children()}
