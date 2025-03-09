import { serverList } from "../components/servers/getServers.svelte";
import type { Message } from "../types/Message";
import { activeChannel, messages, pushMessage } from "../components/store.svelte";

export default function initWebSockets() {
	const servers: string[] = [];

	serverList.servers.forEach((server) => {
		if (!servers.includes(server.serverUrl)) servers.push(server.serverUrl);
	});

	servers.forEach((serverUrl) => {
		const clearUrl = serverUrl.replace("http://", "").replace("https://", "");
		createWebsocket(clearUrl);
	});
}

function createWebsocket(server: string) {
	const ws = new WebSocket(`ws://${server}/ws`);

	ws.onopen = () => {
		ws.send("Hello, world!");
	};

	ws.onmessage = (event) => {
		handleWebsocketMessage(event);
	};

	ws.onclose = () => {};

	ws.onerror = (e) => {};

	return ws;
}

type WebsocketMessage = {
	type: string;
	data: newMessage;
};

type newMessage = {
	serverUrl: string;
	message: Message;
};

const handleWebsocketMessage = async (event: MessageEvent) => {
	try {
		const data: WebsocketMessage = JSON.parse(event.data);
		console.log(data);
		switch (data.type) {
			case "newMessage":
				if (activeChannel.channelId === data.data.message.channelId) {
					console.log("[WS] Got new message");
					pushMessage(data.data.message);
				}
				break;
		}
	} catch (e) {
		console.log("[WS] Got non JSON message");
		return;
	}
};
