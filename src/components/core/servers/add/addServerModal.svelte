<script lang="ts">
	import { debounce } from "$lib/debounce";
	import Modal from "../../modal.svelte";
	import { serverList } from "../getServers.svelte";

	let { open = $bindable(false) } = $props();

	let server = $state({
		iconUrl: "",
		name: "",
		description: "",
	});

	let formData = $state({
		serverURL: "",
		username: "",
		password: "",
	});

	const fetchServerData = async (url: string) => {
		try {
			const serverData = await fetch(`${url}`, {
				method: "GET",
				headers: {
					Accept: "*/*",
				},
			});

			const data = await serverData.json();
			console.log(data);

			server.iconUrl = data.iconUrl;
			server.name = data.name;
			server.description = data.description;
		} catch (e) {
			console.error("Server not found at URL:", url);
		}
	};

	const fetchServerDataDebounce = debounce(fetchServerData, 300);

	$effect(() => {
		if (formData.serverURL.length > 7 && (formData.serverURL.startsWith("https://") || formData.serverURL.startsWith("http://"))) fetchServerDataDebounce(formData.serverURL);
	});

	const handleLogin = async () => {
		const loginData = await fetch(`${formData.serverURL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
			}),
		});

		// serverList.servers.push({
		// 	serverUrl: formData.serverURL,
		// 	username: formData.username,
		// 	token: loginData.token,
		// });
		console.log(loginData);
	};
	const handleRegister = async () => {
		const registerData = await fetch(`${formData.serverURL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: formData.username,
				password: formData.password,
			}),
		});
		console.log(registerData);
	};
</script>

<Modal bind:open>
	<h1>Add Server</h1>
	<div>
		{#if server.iconUrl}
			<div class="center">
				<img src={server.iconUrl} alt="Server Icon" class="image" />
			</div>
		{/if}
		{#if server.name}
			<h2>{server.name}</h2>
		{/if}
		{#if server.description}
			<p>{server.description}</p>
		{/if}
	</div>
	<form>
		<label>Server URL:</label>
		<input type="text" bind:value={formData.serverURL} placeholder="https://ca.example.com" />

		<label>Username:</label>
		<input type="text" bind:value={formData.username} placeholder="ACoolName!" />

		<label>Password:</label>
		<input type="password" bind:value={formData.password} placeholder="****" />

		<div class="buttonRow">
			<button onclick={handleLogin}>Login</button>
			<button onclick={handleRegister}>Register</button>
		</div>
	</form>
</Modal>

<style>
	h1 {
		margin: 0;
		font-weight: 600;
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
	}

	h2 {
		margin: 0;
		font-weight: 600;
		text-align: center;
	}

	p {
		margin: 0;
		margin-top: 0.1rem;
		text-align: center;
		font-size: 0.75rem;
	}

	form {
		display: flex;
		flex-direction: column;
		margin-top: 0.5rem;
	}

	.buttonRow {
		margin-top: 0.5rem;
		display: flex;
	}

	button {
		width: 100%;
		margin-inline: 0.1rem;
	}

	.center {
		margin-bottom: 0.5rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.image {
		display: flex;
		width: 7rem;
		height: 7rem;
		border-radius: 0.5rem;
		overflow: hidden;
		object-fit: cover;
	}
</style>
