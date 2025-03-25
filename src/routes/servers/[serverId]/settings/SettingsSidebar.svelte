<script lang="ts">
	import { page } from "$app/state";
	const serverId = page.params.serverId;

	const settings = [
		{ name: "General", path: `general` },
		{ name: "Channels", path: "channels" },
	];
</script>

<div class="mt-2 ml-4 mr-2">
	<div class="flex flex-col gap-1.5">
		{#each settings as setting}
			<a class={`${page.url.pathname === `/servers/${serverId}/settings/${setting.path}` ? "bg-[#3f3f3f]" : "bg-zinc-800"} px-6 py-2 rounded cursor-pointer`} href={`/servers/${serverId}/settings/${setting.path}`}>
				{setting.name}
			</a>
		{/each}
	</div>
</div>
