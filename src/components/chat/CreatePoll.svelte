<script lang="ts">
	import Modal from "../core/modal.svelte";
	import IconTrash from "~icons/lucide/trash-2";
	import IconPlus from "~icons/lucide/plus";
	import Checkbox from "../core/Checkbox.svelte";
	import StyledButton from "../core/styledButton.svelte";
  import { autoFocus } from "$lib/use/autoFocus.svelte";

	type PollSubmitCallback = (question: string, answers: string[], isMultiple: boolean) => Promise<boolean>;
	type Props = {
		open: boolean;
		onsubmit?: PollSubmitCallback;
	}

	let { open = $bindable(false), onsubmit }: Props = $props();

	let error = $state("");
	let loading = $state(false);
	let question = $state("");
	let answers = $state<string[]>(["", ""]);
	let isMultiple = $state(false);

	const removeAnswer = (index: number) => () => {
		if (index === 0) return;
		answers = answers.filter((_, i) => i !== index);
	};

	const addAnswer = () => {
		if (loading) return;
		if (answers.length >= 6) return;
		answers = [...answers, ""];
	};

	const close = () => {
		if (loading) return;
		if (loading) return;
		open = false;
	}

	const submit = async () => {
		if (loading) return;
		loading = true;

		question = question.trim();
		if (question.length === 0) {
			error = "You need to provide a question";
			loading = false;
			return;
		}

		answers = answers.map((answer) => answer.trim()).filter((answer) => answer.length > 0);
		if (answers.length < 2) {
			error = "You need at least 2 answears";
			loading = false;
			return;
		}
		if (answers.length > 6) {
			error = "You can only have 6 answears";
			loading = false;
			return;
		}

		if (!onsubmit) {
			error = "No submit callback provided";
			loading = false;
			return;
		}

		const result = await onsubmit(question, answers, isMultiple);
		if (!result) {
			error = "Failed creating poll";
			loading = false;
			return;
		}

		loading = false;
		close();
	}
</script>
<Modal bind:open>
	<div class="flex flex-col gap-3 min-w-100 max-w-full">
		<h1 class="text-2xl font-bold">Create a poll</h1>
		<label class="flex flex-col gap-1">
			<div class="text-neutral-300 text-sm">Question</div>
			<input type="text" class="bg-zinc-800 rounded-lg w-full px-3 py-2 outline-none disabled:cursor-no-drop" placeholder="What is your question?" bind:value={question} maxlength="128" disabled={loading} use:autoFocus />
		</label>
		<div class="flex flex-col gap-2">
			<div class="text-neutral-300 text-sm">Answears</div>
			{#each answers as _, i}
				<div class="flex items-center">
					<input type="text" class="bg-zinc-800 rounded-lg w-full px-3 py-2 outline-none disabled:cursor-no-drop" placeholder="Write an answear" bind:value={answers[i]} maxlength="128" disabled={loading} />
					{#if answers.length > 2}
						<button class="cursor-pointer text-neutral-400 hover:text-red-500 p-2 disabled:cursor-no-drop" onclick={removeAnswer(i)} disabled={loading}>
							<IconTrash />
						</button>
					{/if}
				</div>
			{/each}
			{#if answers.length < 6}
				<button class="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2 cursor-pointer text-neutral-400 hover:text-neutral-200 hover:bg-zinc-700 disabled:cursor-no-drop" onclick={addAnswer} disabled={loading}>
					<IconPlus />
					Add an answear
				</button>
			{/if}
		</div>
		<div class="flex flex-col gap-2">
			<div class="text-neutral-300 text-sm">Options</div>
			<div class="flex items-center gap-2 text-neutral-400">
				<Checkbox bind:value={isMultiple} label="Allow multiple answears" disabled={loading} />
			</div>
		</div>
		<div class="flex items-center justify-end gap-4">
			{#if error}
				<div class="text-red-500 text-sm mr-auto">{error}</div>
			{/if}
			{#if !loading}
				<button class="text-neutral-400 hover:underline cursor-pointer hover:text-neutral-200" onclick={close} >
					Cancel
				</button>
			{/if}
			<StyledButton {loading} onclick={submit}>
				Create poll
			</StyledButton>
		</div>
	</div>
</Modal>
