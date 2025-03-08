<script lang="ts">
	import { goto } from "$app/navigation";
	import { getIdentity } from "$lib/identityManagement";
	import loginRSA from "$lib/loginRSA";
	import { serverList } from "../../../components/servers/getServers.svelte";
	import { joinData } from "./joinController.svelte";

	const join = async () => {
		const identity = getIdentity("nnxzwkso3s1mmhgkzswsojyd");
		if (!identity) return;
		const result = await loginRSA(identity, joinData.url!);

		const serverId = serverList.servers.reduce((max, server) => (server.id > max ? server.id : max), 0) + 1;

		serverList.servers.push({
			id: serverId,
			identityId: identity.id,
			name: joinData.serverStatus?.name ?? "",
			description: joinData.serverStatus?.description ?? "",
			iconUrl: joinData.serverStatus?.iconUrl ?? "",
			serverUrl: joinData.url!,
			username: result.user.name,
			token: result.token,
			channels: result.channels ?? [],
		});

		// Redirect to the server
		goto(`/servers/${serverId}`);
	};
</script>

<div class="background">
	<main class="container">
		<div class="server">
			{#if joinData.serverStatus?.iconUrl}
				<img class="icon" src={joinData.serverStatus?.iconUrl ?? ""} alt={joinData.serverStatus?.name ?? ""} />
			{:else}
				<div class="icon flex items-center justify-center bg-teal-500 text-white font-bold rounded w-full h-full">
					<p class="text-center text-4xl">
						{joinData.serverStatus!.name[0]}{joinData.serverStatus!.name[1].toLowerCase()}
					</p>
				</div>
			{/if}
			<div class="info">
				<div class="info__welcome">You are welcome to join</div>
				<h1>{joinData.serverStatus?.name ?? ""}</h1>
				<p class="info__desciption">{joinData.serverStatus?.description ?? ""}</p>
			</div>
		</div>
		<button class="join-btn" id="js-join-btn" onclick={join}>
			Join
			{joinData.serverStatus?.name ?? ""}
		</button>
		<div class="download">
			This server is not hosted by Concordia.
			<br />
			Content and moderation are managed by the server owner.
		</div>
	</main>
</div>

<style>
	.background {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100%;
		background: linear-gradient(315deg, #654ea3, #eaafc8);
	}

	.container {
		background-color: #0f0f0f;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-radius: 1rem;
		max-width: 90%;
		min-width: fit-content;
		padding: 1.5rem;
	}

	.icon {
		width: 7rem;
		height: 7rem;
		border-radius: 0.5rem;
		object-fit: cover;
	}

	h1 {
		font-size: 2rem;
		margin: 0;
	}

	.info__welcome {
		font-size: 1rem;
		font-weight: 300;
		opacity: 0.9;
	}

	.info__desciption {
		font-size: 1rem;
		font-weight: 300;
		opacity: 0.8;
		margin: 0.5rem 0;
	}

	.join-btn {
		background-color: #654ea3;
		color: white;
		border: none;
		border-radius: 0.5rem;
		cursor: pointer;
		font: inherit;
		padding: 0.5rem 0.75rem;
		width: 100%;
	}

	.server {
		display: flex;
		gap: 1rem;
	}

	.download {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.join-btn:hover {
		background-color: #5c4397;
	}
</style>
