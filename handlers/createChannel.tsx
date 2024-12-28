import T_Channel from "@/types/channel";
import T_Server from "@/types/server";
import { setServerChannels } from "./storage";

export default async function createChannel(server: T_Server, channel: T_Channel, callback?: Function) {
	await fetch(`${server.ip}/channels/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"accessToken": server.accessToken,
		},
		body: JSON.stringify(channel),
	}).then(async (res) => {
		if (res.status == 200) {
			const channels = await res.json();
			console.log(channels);
			setServerChannels(server, channels);
			if (callback) callback();
		} else {
			console.error("Failed to create channel");
			console.log(res);
		}
	});
}
