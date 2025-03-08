<script lang="ts">
	import { goto } from "$app/navigation";
	import { createIdentity } from "$lib/identityManagement";
	import StyledButton from "../../components/core/styledButton.svelte";

	let username = $state("");
	let loading = $state(false);
	const handleSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		if (loading) return;
		loading = true;
		await createIdentity({ username, description: "Main identity" });
		loading = false;
		goto("/");
	};
</script>

<div class="flex flex-col items-center justify-center h-screen">
	<h1>Welcome to Concordia!</h1>
	<h2>To start using concordia please create your first identity!</h2>

	<form onsubmit={handleSubmit} class="flex flex-col items-center">
		<input class="p-1 rounded bg-white m-2 text-black" placeholder="ConcordiaUser" bind:value={username} type="text" />
		<StyledButton type="submit" {loading}>Create identity</StyledButton>
	</form>
</div>

<style></style>
