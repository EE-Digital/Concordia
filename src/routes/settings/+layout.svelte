<script lang="ts">
	const { children } = $props();
	import "@fontsource-variable/funnel-sans";
	import SideBar from "../../components/settings/sideBar.svelte";
	import { page } from "$app/state";
</script>

<main>
	<div class="flex">
		<SideBar />
		<div>
			{@render children()}
		</div>
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
