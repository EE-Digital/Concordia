<script lang="ts">
	import { generateKeys } from "$lib/identityManagement";
	import { initDeeplinks } from "$lib/deepLink";
	import { sign } from "$lib/identityManagement";

	initDeeplinks();

	const { children } = $props();
</script>

<button onclick={() => generateKeys("req")}>Super Cool Button!</button>
<button onclick={() => sign("Hello world!", "req")}>Sign hello world!</button>
{@render children()}
