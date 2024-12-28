import T_Channel from "./channel";
import T_User from "./user";

type T_Server = {
	id: number;
	accessToken: string;
	title: string;
	ip: string;
	iconURL?: string;
	channels: T_Channel[];
	user?: T_User;
	lastUpdated?: number;
};

export default T_Server;
