<script lang="ts">
	import { clickOutside } from "$lib/use/clickOutside.svelte";
	import Settings from "~icons/lucide/settings";
	import Leave from "~icons/lucide/door-open";
	import logoutFromServer from "$lib/logoutFromServer";
	import { goto } from "$app/navigation";

	const { closeServerEdit, server } = $props();

	type action = {
		title: string;
		icon?: any;
		func: () => void;
		hasPermissions: () => boolean;
		danger?: boolean;
	};

	let actions: action[] = [
		{
			title: "Configuration",
			icon: Settings,
			func: () => {
				goto(`/servers/${server.id}/settings/general`);
			},
			hasPermissions: () => {
				return true;
			},
		},
		{
			title: "Leave server",
			icon: Leave,
			func: () => {
				logoutFromServer(server);
				goto("/"); // Redirect to home
			},
			hasPermissions: () => true,
			danger: true,
		},
	];
</script>

<div class="absolute bg-zinc-800 w-3 h-3 transform -translate-x-1/2 -translate-y-1/2 rotate-45 top-9 left-1/2"></div>
<div
	class="absolute bg-zinc-800 w-full top-9 p-2 rounded-lg flex flex-col gap-1"
	use:clickOutside={() => {
		closeServerEdit();
	}}
>
	{#each actions.filter((action) => action.hasPermissions()) as action}
		<button class="flex items-center justify-between py-1 px-2 w-full rounded text-left cursor-pointer {action.danger ? 'text-red-500 hover:bg-red-500 hover:text-white' : 'hover:bg-(--accent-color)'}" onclick={action.func}>
			<action.icon class="text-md" />
			<p class="text-md text-nowrap overflow-ellipsis overflow-hidden">
				{action.title}
			</p>
		</button>
	{/each}
</div>
