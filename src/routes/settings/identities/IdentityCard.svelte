<script lang="ts">
	import { deleteIdentity, type RsaIdentity } from "$lib/identityManagement";
	import StyledButton from "../../../components/core/styledButton.svelte";

	type Props = {
		identity: RsaIdentity;
	};

	const { identity }: Props = $props();
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
	<StyledButton dangerous onclick={() => deleteIdentity(identity.id)}>Delete</StyledButton>
</div>

<style>
</style>
