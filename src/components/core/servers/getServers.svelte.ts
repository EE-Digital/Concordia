import { loadLocalData } from "$lib/localData";
import type { Server } from "../../../types/LocalData";

const serverList: { servers: Server[] } = $state({ servers: [] });

async function loadServers() {
	const data = await loadLocalData();
	serverList.servers = data.servers;
}

loadServers();

export { serverList };
