<script lang="ts">
	import apiRequest from "$lib/apiRequest";
	import { getContext } from "svelte";
	import TextInput from "../../../../../components/settings/module/textInput.svelte";
	import type { Server } from "../../../../../types/LocalData";
	type ServerConfig = {
		name: string;
		description: string;
		version: string;
	};

	const server: Server = getContext("server");
	let serverConfig: ServerConfig | null = $state(null);
	let loading = $state(true);

	const getData = async () => {
		loading = true;
		const data = await apiRequest("GET", `${server.serverUrl}/status`, null, server.token);
		serverConfig = data;

		loading = false;
	};
	getData();
</script>

<div class="flex flex-col">
	<div>
		<h2 class="text-xl">General settings</h2>
		<p class="mb-4 text-sm font-light">Modify server name, description, url and more!</p>
	</div>

	{#if loading || serverConfig === null}
		<p>Loading...</p>
	{:else}
		<div>
			<p>{serverConfig.version}</p>
			<TextInput label="Server name" placeholder="My server" bind:value={serverConfig.name} />
		</div>
	{/if}
</div>
