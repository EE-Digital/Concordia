export type LocalData = {
	servers: Server[];
};

export type Server = {
	name: string;
	description?: string;
	serverUrl: string;
	iconUrl?: string;
	username: string;
	token: string;
};
