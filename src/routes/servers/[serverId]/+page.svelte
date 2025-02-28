<script lang="ts">
	import { onMount } from "svelte";
	let serverId = $state("");
	onMount(() => {
		serverId = window.location.href.toString().split("/").pop() ?? "";

		console.log(serverId);
	});
</script>

<h1>{serverId}</h1>
