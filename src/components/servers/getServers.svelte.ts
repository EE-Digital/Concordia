import type { Server } from "../../types/LocalData";

const serverList: { servers: Server[] } = $state({ servers: [] });

async function loadServers() {
	serverList.servers = JSON.parse(localStorage.getItem("servers") || "[]");
}

loadServers();

export { serverList };
