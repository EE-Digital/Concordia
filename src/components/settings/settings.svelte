<script lang="ts">
	import { goto } from "$app/navigation";
	import { pushHistory } from "$lib/history";
	import Settings from "~icons/lucide/settings";

	const handleClick = () => {
		pushHistory(window.location.pathname);

		goto("/settings/servers");
	};
</script>

<button class="mt-2 squareish" onclick={handleClick}>
	<Settings color="white" />
</button>

<style>
	.squareish {
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
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
