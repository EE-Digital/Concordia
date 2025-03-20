<script lang="ts">
	import EmojiList from "./EmojiList.svelte";
	import EmojiOrdering from "./EmojiOrdering.json";

	import IconSmile from "~icons/lucide/smile";
	import IconPeople from "~icons/lucide/users";
	import IconAnimals from "~icons/lucide/paw-print";
	import IconFood from "~icons/lucide/apple";
	import IconTravel from "~icons/lucide/plane";
	import IconActivities from "~icons/lucide/bike";
	import IconObjects from "~icons/lucide/box";
	import IconSymbols from "~icons/lucide/asterisk";
	import IconFlag from "~icons/lucide/flag";

	let activeGroup = $state<number | undefined>(undefined);

	type Props = {
		onselect: (emoji: string, close: boolean) => void;
	};
	let { onselect }: Props = $props();

	const groupIcons = [IconSmile, IconPeople, IconAnimals, IconFood, IconTravel, IconActivities, IconObjects, IconSymbols, IconFlag];

	const toggleGroupHandle = (index: number) => () => {
		activeGroup = activeGroup === index ? undefined : index;
	};
</script>

<div class="h-full flex flex-col bg-zinc-800 rounded-2xl overflow-hidden">
	<div class="flex bg-zinc-900">
		{#each EmojiOrdering as group, i}
			<button onclick={toggleGroupHandle(i)} class="py-2 w-full cursor-pointer flex justify-center border-b-2 text-lg {activeGroup === i ? 'bg-zinc-700 border-(--accent-color)' : 'text-neutral-400 border-transparent hover:bg-zinc-800 hover:text-neutral-300'}">
				<svelte:component this={groupIcons[i]} />
			</button>
		{/each}
	</div>
	<div class="h-full w-full overflow-auto px-2">
		{#each EmojiOrdering as group, i}
			<div class="block" class:hidden={activeGroup !== i && activeGroup !== undefined}>
				<div class="sticky top-0 bg-zinc-800 text-neutral-400 py-1">{group.group}</div>
				<EmojiList emojis={group.emoji} {onselect} />
			</div>
		{/each}
	</div>
</div>
