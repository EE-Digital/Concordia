<script lang="ts">
	const { children } = $props();
	import "@fontsource-variable/funnel-sans";
</script>

<main>{@render children()}</main>

<style>
	:root {
		background-color: #0f0f0f;
		font-family: "Funnel Sans", sans-serif;
		overflow: hidden;
		height: 100vh;
		width: 100vw;
		/* zoom: 2; */

		--accent-color: #8f25ab;
		--on-accent-color: #fff;
	}
</style>
