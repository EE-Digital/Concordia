<script lang="ts">
	const { children } = $props();
	import "@fontsource-variable/funnel-sans";
	import SettingsSideBar from "./SettingsSidebar.svelte";
	import { goto } from "$app/navigation";
	import ArrowBack from "~icons/lucide/arrow-left";
	import { popHistory } from "$lib/history";
	import { serverList } from "../../../../components/servers/getServers.svelte";
	import { page } from "$app/state";
	import { setContext } from "svelte";

	const escKeyHandler = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			e.preventDefault();
			exitSettings();
		}
	};
	if (typeof page.params.serverId !== "string") throw new Error("Invalid serverId");

	const server = serverList.servers.find((server) => server.id == parseInt(page.params.serverId));
	if (!server) throw new Error("Server not found");
	setContext("server", server);

	const exitSettings = () => {
		goto("/servers/" + server.id);
	};
</script>

<svelte:document onkeydown={escKeyHandler} />

<div class="w-full h-full">
	<div class="w-full bg-zinc-800 flex items-center justify-start gap-5 pt-1 px-4 pb-0.5 mb-1.5">
		<button class="cursor-pointer" onclick={exitSettings}>
			<ArrowBack />
		</button>
		<h1>{server.name} settings</h1>
	</div>
	<div class="h-screen w-full flex flex-row">
		<SettingsSideBar />
		{@render children()}
	</div>
</div>
