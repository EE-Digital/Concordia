<script lang="ts">
	const settings = [{ name: "Identities", path: "/settings/identities" }];
</script>

<div>
	<h1>Settings</h1>

	{#each settings as setting}
		<a href={setting.path}>{setting.name}</a>
	{/each}
</div>

<style>
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
</style>
