<script lang="ts">
	import { deleteIdentity } from "$lib/identityManagement";
	import StyledButton from "../../../components/core/styledButton.svelte";
	import type { RsaIdentity } from "../../../types/RsaIdentity";

	type Props = {
		identity: RsaIdentity;
	};

	const { identity }: Props = $props();

	let loading = $state(false);
	const deleteIdentityHandler = async () => {
		if (loading) return;
		loading = true;

		await deleteIdentity(identity.id);
		loading = false;
	};
</script>

<div class="flex justify-between bg-zinc-900 p-2 rounded">
	<div>
		<div class="flex">
			<h1 class="font-bold">
				{identity.user.username}
			</h1>
			<p class="text-zinc-300 ml-2">{identity.id}</p>
		</div>
		<p>{identity.user.description}</p>
	</div>
	<StyledButton {loading} dangerous onclick={deleteIdentityHandler}>Delete</StyledButton>
</div>

<style>
</style>
