<script>
	import { isAutostartEnabled, toggleAutostart } from "$lib/autostart";
	import Loading from "../../../components/core/loading.svelte";
	import ToggleInput from "../../../components/settings/module/toggleInput.svelte";

	let loading = $state(true);
	let value = $state(false);

	let load = async () => {
		value = await isAutostartEnabled();
		loading = false;
	};
	load();
</script>

{#if loading}
	<div class="flex justify-center items-center h-full">
		<Loading />
	</div>
{:else}
	<h2 class="text-xl">General settings</h2>
	<div class="flex justify-between items-center mb-6">
		<p class="text-sm font-light">Edit your client's local settings here.</p>
	</div>

	<ToggleInput label="Autostart" bind:value onclick={toggleAutostart} />
{/if}
