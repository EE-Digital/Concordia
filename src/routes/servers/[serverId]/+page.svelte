<script lang="ts">
	import { onMount } from "svelte";
	let serverId = $state("");
	onMount(() => {
		serverId = window.location.href.toString().split("/").pop() ?? "";
		const server = JSON.parse(localStorage.getItem("servers") ?? "").find((server: { id: string }) => server.id === serverId);

		console.log(server);
	});
</script>

<h1>{serverId}</h1>
