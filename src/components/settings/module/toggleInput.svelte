<script lang="ts">
	type Props = {
		label: string;
		value: boolean;
		onclick?: () => void;
	};
	let { label, value = $bindable(), onclick }: Props = $props();
</script>

<div class="flex items-center justify-between">
	<h1>{label}</h1>
	<label class="switch">
		<input type="checkbox" bind:checked={value} {onclick} />
		<span class="slider"></span>
	</label>
</div>

<style>
	.switch {
		position: relative;
		display: inline-block;
		width: 40px;
		height: 20px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ffffff22;
		transition: 0.4s;
		border-radius: 34px;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 16px;
		width: 16px;
		left: 2px;
		bottom: 2px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: var(--accent-color);
	}

	input:focus + .slider {
		box-shadow: 0 0 1px var(--accent-color);
	}

	input:checked + .slider:before {
		transform: translateX(18px);
	}
</style>
