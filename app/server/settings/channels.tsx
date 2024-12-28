import { View, Text } from "react-native";
import ServerPageLabel from "../../../components/ServerPageLabel";
import Server from "../../../types/server";
import { Colors } from "@/constants/Colors";
import T_Channel from "@/types/channel";
import { FlatList, RectButton } from "react-native-gesture-handler";
import createChannel from "@/handlers/createChannel";
import T_Server from "../../../types/server";
import { triggerUpdateChannels } from "@/components/ChannelList";

export default function ChannelServerSettings(props: { server: T_Server; triggerUpdate: Function }) {
	const server = props.server;

	return (
		<View
			style={{
				flex: 1,
				width: "100%",
			}}>
			<ServerPageLabel title="Channels" />
			<ChannelList server={server} triggerUpdate={props.triggerUpdate} />
		</View>
	);
}

const ChannelList = (props: { server: Server; triggerUpdate: Function }) => {
	return (
		<View style={{ backgroundColor: Colors.dark.secondaryBackground, flex: 1, flexDirection: "column", marginBottom: 20, padding: 5, borderRadius: 2, width: 100 }}>
			<FlatList data={props.server.channels} renderItem={({ item }) => <Channel channel={item} />} showsHorizontalScrollIndicator={false} />
			<View style={{ height: 2, marginBottom: 5, borderRadius: 5, backgroundColor: "#ddd" }} />
			<RectButton
				onPress={() =>
					createChannel(props.server, { id: 0, title: "12321321312" }, () => {
						props.triggerUpdate();
						triggerUpdateChannels();
					})
				}>
				<View style={{ backgroundColor: Colors.dark.background, padding: 5, borderRadius: 2, cursor: "pointer" }}>
					<Text style={{ color: "white", textAlign: "center" }}>Add Channel</Text>
				</View>
			</RectButton>
		</View>
	);
};

const Channel = (props: { channel: T_Channel }) => {
	return (
		<View style={{ backgroundColor: Colors.dark.background, padding: 5, borderRadius: 2, marginBottom: 5, cursor: "pointer" }}>
			<Text style={{ color: "white", textAlign: "center" }}>{props.channel.title}</Text>
		</View>
	);
};
