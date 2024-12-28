import { View, Text } from "react-native";
import ServerPageLabel from "../../../components/ServerPageLabel";
import Server from "../../../types/server";
import { Colors } from "@/constants/Colors";
import T_Channel from "@/types/channel";
import { FlatList, RectButton } from "react-native-gesture-handler";
import createChannel from "@/handlers/createChannel";
import T_Server from "../../../types/server";
import { triggerUpdateChannels } from "@/components/ChannelList";
import { useState } from "react";
import StyledTextInput from "@/components/inputs/StyledTextInput";
import StyledButton from "@/components/inputs/StyledButton";
import deleteChannel from "@/handlers/deleteChannel";

export default function ChannelServerSettings(props: { server: T_Server; triggerUpdate: Function }) {
	const server = props.server;
	const [selectedChannel, setSelectedChannel] = useState<T_Channel>(props.server.channels[0] ?? null);

	return (
		<View
			style={{
				flex: 1,
				width: "100%",
			}}>
			<ServerPageLabel title="Channels" />
			<View style={{ flexDirection: "row", flex: 1, width: "100%" }}>
				<ChannelList server={server} triggerUpdate={props.triggerUpdate} selectFunction={setSelectedChannel} />
				{selectedChannel ? <ChannelSettings channel={selectedChannel} server={server} triggerUpdate={props.triggerUpdate} /> : null}
			</View>
		</View>
	);
}

const ChannelSettings = (props: { channel: T_Channel; server: T_Server; triggerUpdate: Function }) => {
	function handleDelete() {
		deleteChannel(props.server, props.channel, () => {
			triggerUpdateChannels();
			props.triggerUpdate();
		});
	}

	return (
		<View style={{ flex: 1, width: "100%", marginLeft: 10, marginBottom: 20 }}>
			<StyledTextInput label="Title" width={200} text={props.channel.title} />
			<View style={{ height: 10 }} />
			<StyledButton label={"Delete channel"} bold backgroundColor={"#f00"} onPress={handleDelete} />
		</View>
	);
};

const ChannelList = (props: { server: Server; triggerUpdate: Function; selectFunction: Function }) => {
	return (
		<View style={{ flex: 1, flexDirection: "column", marginBottom: 20, padding: 5, borderRadius: 2, maxWidth: 150 }}>
			<FlatList data={props.server.channels} renderItem={({ item }) => <Channel channel={item} select={props.selectFunction} />} showsHorizontalScrollIndicator={false} />
			<View style={{ height: 2, marginBottom: 5, borderRadius: 5, backgroundColor: "#ddd" }} />
			<RectButton
				onPress={() =>
					createChannel(props.server, { id: 0, title: "12321321312" }, () => {
						props.triggerUpdate();
						triggerUpdateChannels();
					})
				}>
				<View style={{ backgroundColor: Colors.dark.secondaryBackground, padding: 5, borderRadius: 2, cursor: "pointer" }}>
					<Text style={{ color: "white", textAlign: "center" }}>Add Channel</Text>
				</View>
			</RectButton>
		</View>
	);
};

const Channel = (props: { channel: T_Channel; select: Function }) => {
	return (
		<RectButton onPress={() => props.select(props.channel)}>
			<View style={{ backgroundColor: Colors.dark.secondaryBackground, padding: 5, borderRadius: 2, marginBottom: 5, cursor: "pointer" }}>
				<Text style={{ color: "white", textAlign: "center" }}>{props.channel.title}</Text>
			</View>
		</RectButton>
	);
};
