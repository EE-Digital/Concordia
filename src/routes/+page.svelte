<script lang="ts">
	import { onMount } from "svelte";

	onMount(() => {
		window.location.href = "/servers/1";
	});
</script>

<div class="center">
	<div class="image">
		<h1>Logo</h1>
	</div>
	<div class="loading">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</div>

<style>
	:root {
		--color: #7348e7;
	}

	.center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.image {
		width: 80px;
		height: 80px;
		background: var(--color);
		border-radius: 0.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image h1 {
		color: #0f0f0f;
		font-size: 1.5rem;
		font-weight: 600;
	}
	.loading,
	.loading div {
		box-sizing: border-box;
	}
	.loading {
		margin-top: 1rem;
		display: inline-block;
		position: relative;
		width: 80px;
		height: 2rem;
	}
	.loading div {
		position: absolute;
		width: 13.33333px;
		height: 13.33333px;
		border-radius: 50%;
		background: var(--color);
		animation-timing-function: cubic-bezier(0, 1, 1, 0);
	}
	.loading div:nth-child(1) {
		left: 8px;
		animation: lds-ellipsis1 0.6s infinite;
	}
	.loading div:nth-child(2) {
		left: 8px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.loading div:nth-child(3) {
		left: 32px;
		animation: lds-ellipsis2 0.6s infinite;
	}
	.loading div:nth-child(4) {
		left: 56px;
		animation: lds-ellipsis3 0.6s infinite;
	}
	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>
