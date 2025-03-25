<script lang="ts">
	type Props = {
		label: string;
		placeholder?: string;
		value: any;
	};
	let { label, placeholder, value = $bindable() }: Props = $props();
</script>

<div>
	<h1 class="text-lg font-bold">{label}</h1>
	<input type="text" bind:value {placeholder} class="bg-white text-black p-1 rounded" />
</div>
