import T_Role from "./role";

type T_User = {
	username: string;
	nickname?: string;
	password?: string;
	id: string;
	profilePicture: string;
	roles: T_Role[];
};

export default T_User;
