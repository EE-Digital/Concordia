<script lang="ts">
	import Plus from "~icons/lucide/plus";
	import AddServerModal from "./addServerModal.svelte";
	let open = $state(false);

	function addServer() {
		open = true;
	}
</script>

<button onclick={addServer} class="squareish flex justify-center items-center">
	<Plus color="white" />
</button>

<AddServerModal bind:open />

<style>
	.squareish {
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		border-radius: 0.25rem;
		background-color: #2c2c2c;
		transition: border-radius 150ms ease-in-out;
	}

	.squareish:hover {
		border-radius: 0.5rem;
	}
</style>
