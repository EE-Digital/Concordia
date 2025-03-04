// src/routes/server/[serverId]/+page.ts
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
	return {
		serverId: params.serverId,
		key: params.serverId,
	};
};
