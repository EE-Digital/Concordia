<script lang="ts">
	import { page } from "$app/state";

	const settings = [
		{ name: "Servers", path: "/settings/servers" },
		{ name: "Identities", path: "/settings/identities" },
	];
</script>

<div>
	<h1>Settings</h1>

	<div class="flex flex-col gap-1">
		{#each settings as setting}
			<a href={setting.path} class:active={page.url.pathname === setting.path}>
				{setting.name}
			</a>
		{/each}
	</div>
</div>

<style>
	div {
		margin-left: 0.5rem;
	}

	h1 {
		margin: 0;
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 24px;
		text-align: center;
	}

	a {
		all: unset;
		background-color: #2f2f2f;
		padding: 0.5rem 1.5rem;
		border-radius: 0.25rem;
		cursor: pointer;
	}

	.active {
		background-color: #3f3f3f;
	}
</style>
