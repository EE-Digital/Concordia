<script lang="ts">
	import type { Server } from "../../../types/LocalData";

	type Props = {
		server: Server;
	};

	const { server }: Props = $props();
</script>

<div>
	<img src={server.iconUrl} alt={server.name} />
</div>
