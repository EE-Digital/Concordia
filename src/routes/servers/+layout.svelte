<script lang="ts">
	const { children } = $props();
	import "@fontsource-variable/funnel-sans";
	import Sidebar from "../../components/core/sidebar.svelte";
</script>

<main>
	<div class="flex flex-row">
		<Sidebar />
		{@render children()}
	</div>
</main>
