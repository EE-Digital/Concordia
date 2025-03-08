export type UserDefaults = {
	username: string;
	description: string;
};

export type RsaIdentity = {
	id: string;
	user: UserDefaults;
	publicKey: string;
};
