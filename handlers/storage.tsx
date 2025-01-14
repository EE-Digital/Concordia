import Server from "../types/server";
import T_User from "../types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

class User {
	static user: T_User = {} as T_User;

	static async getUserObject() {
		if (!User.user.username) {
			User.user = await getUser();
		}

		return User.user;
	}

	static async setPassword(password: string) {
		User.user.password = password;
		await AsyncStorage.setItem("user", JSON.stringify(User.user));
		return User.user;
	}

	static async setUsername(username: string) {
		User.user.username = username;
		await AsyncStorage.setItem("user", JSON.stringify(User.user));
		return User.user;
	}
}

const getUser = async () => {
	const user: T_User = JSON.parse((await AsyncStorage.getItem("user")) ?? "{}");
	return user;
};

type TypeLocalSettings = {
	servers: Server[];
	LinkInNative: boolean;
};

class LocalSettings {
	static settings: TypeLocalSettings;

	static async get() {
		if (!LocalSettings.settings) {
			LocalSettings.settings = await getLocalSettings();

			// Check if server data is outdated
			LocalSettings.settings.servers.forEach((server) => {
				if (server.lastUpdated == undefined) return (server.lastUpdated = new Date().getTime());
				// 1 hour
				if (new Date().getTime() - server.lastUpdated > 1000 * 60 * 60) updateServerData();
			});
		}

		return LocalSettings.settings;
	}

	static async save(newData: typeof this.settings) {
		if (Platform.OS == "web") {
			const PORT = require("../electron/LocalServer.json").port;
			try {
				await fetch(`http://127.0.0.1:${PORT}/settings`, {
					method: "PUT",
					headers: {
						"Accept": "*/*",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						newData,
					}),
				});
			} catch (e) {
				console.error(e);
			}
			return newData;
		} else {
			await AsyncStorage.setItem("localSettings", JSON.stringify(newData));
			await this.update();
			return newData;
		}
	}

	static async update() {
		LocalSettings.settings = await getLocalSettings();
		return LocalSettings.settings;
	}
}

const addServer = async (server: Server) => {
	let localSettings = await LocalSettings.get();
	localSettings.servers.push(server);

	if (Platform.OS == "web") {
		const PORT = require("../electron/LocalServer.json").port;
		try {
			await fetch(`http://127.0.0.1:${PORT}/settings/setServers`, {
				method: "POST",
				headers: {
					"Accept": "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					newServers: localSettings.servers,
				}),
			});
		} catch (e) {
			console.error(e);
		}
	}
	return await LocalSettings.save(localSettings);
};

const remServer = async (server: Server) => {
	let localSettings = await LocalSettings.get();
	let newServers: Server[] = [];

	localSettings.servers.forEach((item) => {
		if (server.id != item.id) {
			newServers.push(item);
		}
	});

	// localSettings.servers = newServers;
	localSettings.servers = [];

	if (Platform.OS == "web") {
		const PORT = require("../electron/LocalServer.json").port;
		try {
			await fetch(`http://127.0.0.1:${PORT}/settings/setServers`, {
				method: "POST",
				headers: {
					"Accept": "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					newServers: localSettings.servers,
				}),
			});
		} catch (e) {
			console.error(e);
		}
	}
	return await LocalSettings.save(localSettings);
};

const updateServerData = async () => {
	let settings = await LocalSettings.get();

	// Use map to return an array of promises and await them with Promise.all
	const updatedServers: Server[] = await Promise.all(
		settings.servers.map(async (server) => {
			const response = await fetch(server.ip, {
				headers: {
					accesstoken: server.accessToken,
				},
			}); // Fetch server data

			const json = await response.json(); // Parse response as JSON

			// Create new server object
			const result: Server = {
				id: server.id,
				accessToken: server.accessToken,
				user: json.user,
				title: json.title,
				ip: server.ip,
				iconURL: json.iconURL,
				channels: json.channels,
				lastUpdated: new Date().getTime(),
			};
			return result;
		}),
	);

	settings.servers = updatedServers;
	await LocalSettings.save(settings);
};

const getLocalSettings = async () => {
	// If running on web, get settings from electron's storage
	if (Platform.OS == "web")
		try {
			const response = await fetch(`http://127.0.0.1:${require("../electron/LocalServer.json").port}/settings`, {
				method: "POST",
				headers: {
					"Accept": "*/*",
					"Content-Type": "application/json",
				},
			});
			const d = await response.json();

			return d;
		} catch (e) {
			console.error(e);
		}

	// If running on Android/iOS get settings from react storage
	const newLocal: TypeLocalSettings = {
		servers: [],
		LinkInNative: false,
	};
	const settings = await JSON.parse((await AsyncStorage.getItem("localSettings")) ?? "{}");
	if (settings.servers) return settings;
	else return newLocal;
};

const setServerChannels = async (server: Server, channels: any) => {
	let settings = await LocalSettings.get();
	let updateServerIndex = settings.servers.findIndex((item) => item.id == server.id);

	settings.servers[updateServerIndex].channels = channels;
	await LocalSettings.save(settings);
};

export { User, TypeLocalSettings, LocalSettings, addServer, updateServerData, remServer, setServerChannels };
