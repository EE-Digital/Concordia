<script lang="ts">
	import { initDeeplinks } from "$lib/deepLink";

	initDeeplinks();

	const { children } = $props();
</script>

{@render children()}
