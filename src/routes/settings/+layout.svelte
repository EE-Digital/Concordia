<script lang="ts">
	const { children } = $props();
	import "@fontsource-variable/funnel-sans";
	import SideBar from "../../components/settings/sideBar.svelte";
</script>

<main>
	<div class="flex">
		<SideBar />

		{@render children()}
	</div>
</main>

<style>
	:root {
		color: white;
	}

	.flex {
		display: flex;
		flex-direction: row;
	}
</style>
