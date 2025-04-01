<script lang="ts">
	type Props = {
		value: boolean;
		label?: string;
		disabled?: boolean;
	}

	let { value = $bindable(), label, disabled = false }: Props = $props();
</script>

<div>
	<label class="flex items-center cursor-pointer">
		<input type="checkbox" class="peer hidden" bind:checked={value} {disabled} />
		<div class="w-4 h-4 rounded-md border-2 border-zinc-700 bg-zinc-800 peer-checked:bg-(--accent-color) peer-checked:border-(--accent-color) transition-all duration-200 flex items-center justify-center">
			<div class="bg-white rounded-sm {value ?  "opacity-70 w-2.5 h-2.5" : "opacity-0 w-0 h-0"} transition-all duration-200"></div>
		</div>
		{#if label}
			<span class="ml-2 text-sm">{label}</span>
		{/if}
	</label>
</div>
