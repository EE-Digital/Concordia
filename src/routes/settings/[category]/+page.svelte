<script lang="ts">
	import type { SettingsCategory } from "./+page";
	import Identities from "./categories/identities.svelte";
	let { data }: SettingsCategory = $props();
</script>

{#if data.category === "identities"}
	<Identities />
{/if}
