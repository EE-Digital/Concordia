import { View, FlatList, Pressable, Text } from "react-native";
import User from "../types/user";
import Server from "../types/server";
import Channel from "../types/channel";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { setServerChannels } from "@/handlers/storage";

let updateChannels = false;
const triggerUpdateChannels = () => {
	updateChannels = true;
};
export { triggerUpdateChannels };

interface ChanneListProps {
	selected?: Channel;
	setSelected: Function;
	server: Server;
	user?: User;
}

export default function ChannelList(props: ChanneListProps) {
	const [channels, setChannels] = useState<Channel[]>(props.server.channels ?? []);
	const [titleHover, setTitleHover] = useState(false);

	useEffect(() => {
		if (updateChannels) {
			getChannels();
			updateChannels = false;
		}
	}, [updateChannels]);

	const getChannels = async () => {
		try {
			const request = await fetch(`${props.server.ip}/channels`);
			const json = (await request.json()) as Channel[];

			setChannels(json);
			setServerChannels(props.server, json);
			if (json.length > 0) props.setSelected(json[0]);
		} catch (e) {
			setChannels([]);
		}
	};

	useEffect(() => {
		getChannels();
	}, [props.server]);

	useEffect(() => {
		getChannels();
	}, []);

	const handleChange = (channel: Channel) => {
		props.setSelected(channel);
	};

	return (
		<View style={{ paddingHorizontal: 5, flex: 1 }}>
			<Pressable
				onPress={() => {
					console.log(props.server.user);

					if (props.server.user && props.server.user.roles.find((role) => role.name == "Admin")) router.push("/server/settings/main" as any);
				}}
				onPointerEnter={() => setTitleHover(true)}
				onPointerLeave={() => setTitleHover(false)}>
				<View
					style={{
						height: 50,
						borderBottomColor: "white",
						justifyContent: "center",
						paddingHorizontal: 10,
						marginBottom: 10,
						backgroundColor: titleHover ? "#FFFFFF22" : "transparent",
						borderRadius: 5,
					}}>
					<Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>{props.server.title}</Text>
				</View>
			</Pressable>
			{channels.length > 0 ? (
				<FlatList
					data={channels}
					renderItem={(item) => {
						return (
							<ChannelCard
								channel={item.item}
								selected={item.item.id == props.selected?.id}
								onPress={() => {
									handleChange(item.item);
								}}
							/>
						);
					}}
				/>
			) : (
				<View style={{ justifyContent: "center", alignItems: "center", flex: 1, width: "100%" }}>
					<Text style={{ color: "white" }}>No channel found</Text>
				</View>
			)}
		</View>
	);
}

interface ChannelCardProps {
	channel: Channel;
	selected?: boolean;
	onPress: Function;
}

const ChannelCard = (props: ChannelCardProps) => {
	return (
		<Pressable
			onPress={() => {
				props.onPress(props.channel.id);
			}}>
			<View
				style={{
					backgroundColor: props.selected ? "#FFFFFF22" : "transparent",
					marginVertical: 2,
					paddingVertical: 2,
					paddingHorizontal: 10,
					borderRadius: 2,
					width: 150,
				}}>
				<Text style={{ color: "white" }}># {props.channel.title}</Text>
			</View>
		</Pressable>
	);
};
