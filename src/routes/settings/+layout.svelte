<script lang="ts">
	const { children } = $props();
	import "@fontsource-variable/funnel-sans";
	import SideBar from "../../components/settings/sideBar.svelte";
	import { goto } from "$app/navigation";

	const escKeyHandler = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			e.preventDefault();
			goto("/");
		}
	};
</script>

<svelte:document onkeydown={escKeyHandler} />

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
