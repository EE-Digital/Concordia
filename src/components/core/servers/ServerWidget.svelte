<script lang="ts">
	import type { Server } from "../../../types/LocalData";

	type Props = {
		server: Server;
	};

	const { server }: Props = $props();
</script>

<div class="cursor-pointer">
	<div>
		<img src={server.iconUrl} alt={server.name} />
	</div>
</div>

<style>
	div {
		width: 2rem;
		height: 2rem;
		margin-bottom: 0.5rem;
		display: flex;
		overflow: hidden;
	}

	img {
		display: flex;
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		overflow: hidden;
		object-fit: cover;
	}
</style>
