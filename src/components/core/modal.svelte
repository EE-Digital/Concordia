<script lang="ts">
	let { children, open = $bindable(false) } = $props();

	const escKeyHandler = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			e.preventDefault();
			open = false;
		}
	};

	const handleBackgroundClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			open = false;
		}
	};
</script>

<svelte:document onkeydown={escKeyHandler} />

{#if open}
	<div onclick={handleBackgroundClick} class="background">
		<div class="content">
			{@render children()}
		</div>
	</div>
{/if}

<style>
	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: #000000aa;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.content {
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		border-radius: 0.25rem;
		background-color: #0f0f0f;
	}
</style>
