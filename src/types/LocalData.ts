export type LocalData = {
	servers: Server[];
};

export type Server = {
	id: string;
	name: string;
	description?: string;
	serverUrl: string;
	iconUrl?: string;
	username: string;
	token: string;
};
