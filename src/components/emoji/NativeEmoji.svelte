<script lang="ts">
	import { getEmojiFromCodepoint, getEmojiUrlFromCodepoint, hexCodepointFromDec, type EmojiMetadata } from "../../lib/emoji";

	type Props = {
		emoji: EmojiMetadata;
		onselect: (emoji: string, close: boolean) => void;
	};

	const { emoji, onselect }: Props = $props();

	const codepoint = hexCodepointFromDec(emoji.base);
	const url = getEmojiUrlFromCodepoint(codepoint);
	const emojiCharacter = getEmojiFromCodepoint(codepoint);

	function handleClick(e: MouseEvent) {
		onselect(emojiCharacter, !e.shiftKey);
	}
</script>

<button class="w-12 h-12 flex justify-center items-center hover:bg-zinc-600 p-1 rounded cursor-pointer" onclick={handleClick}>
	<img src={url} alt={emoji.shortcodes[0] ?? "emoji"} class="w-full h-full" />
</button>
