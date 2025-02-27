<script lang="ts">
	import { goto } from "$app/navigation";
	import Settings from "~icons/lucide/settings";
</script>

<a href="/settings/identities" class="squareish">
	<Settings color="white" />
</a>

<style>
	a {
		margin-top: 0.5rem;
	}

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
