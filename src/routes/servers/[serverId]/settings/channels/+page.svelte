<script lang="ts">
	import apiRequest from "$lib/apiRequest";
	import { getContext } from "svelte";
	import type { Channel, Server } from "../../../../../types/LocalData";
	import TextInput from "../../../../../components/settings/module/textInput.svelte";

	const server: Server = getContext("server");

	let loading = $state(true);

	const getData = async () => {
		loading = true;
		const data = await apiRequest("GET", `${server.serverUrl}/channels`, null, server.token);
		channels = data;
		loading = false;
	};
	getData();

	let channels: Channel[] = $state([]);
	let value = $state("");
</script>

<div class="w-full h-full flex flex-col">
	<div>
		<h2 class="text-xl">Channel settings</h2>
		<p class="mb-4 text-sm font-light">Modify your channels and their order</p>
	</div>

	<div class="w-full">
		{#if loading}
			<p>Loading...</p>
		{:else}
			<div class="flex">
				<div class="flex flex-col gap-1 m-2 p-1 rounded">
					<!-- Channel list -->
					{#each channels as channel}
						<div class="bg-zinc-800 rounded px-10 py-3">
							<p>{channel.title}</p>
						</div>
					{/each}
				</div>
				<div>
					<TextInput label="Test title" placeholder="Hello world" bind:value />
				</div>
			</div>
		{/if}
	</div>
</div>
