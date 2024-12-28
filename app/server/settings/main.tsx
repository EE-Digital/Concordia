import { useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/Colors";
import ReturnArrow from "@/components/settings/returnArrow";
import SettingsList from "@/components/settings/SettingsList";
import GeneralServerSettings from "./general";
import { selectedServerPublic } from "../../../components/ServerList";
import ChannelServerSettings from "./channels";
import { LocalSettings } from "@/handlers/storage";
import Loading from "@/components/loading";

export default function ServerSettingsScreen() {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedServer, setSelectedServer] = useState(selectedServerPublic);
	const [update, setUpdate] = useState(true);

	useEffect(() => {
		LocalSettings.get().then((settings) => {
			setSelectedServer(settings.servers.find((server) => server.id == selectedServerPublic.id) ?? { id: 0, title: "Unknown", channels: [], accessToken: "", ip: "" });
		});
		setUpdate(false);
	}, [update]);

	const settings = [
		{
			title: "Server settings",
			settings: [
				{
					index: 0,
					title: "General",
					view: <GeneralServerSettings key={0} server={selectedServer} />,
				},
				{
					index: 1,
					title: "Channels",
					view: <ChannelServerSettings key={1} server={selectedServer} triggerUpdate={() => setUpdate(true)} />,
				},
			],
		},
	];

	const MainWindow = (props: { selectedIndex: number }) => {
		return settings[0].settings[props.selectedIndex].view;
	};

	return (
		<GestureHandlerRootView>
			<SafeAreaView
				style={{
					backgroundColor: Colors.dark.background,
					flex: 1,
					flexDirection: "row",
				}}>
				{update ? (
					<Loading />
				) : (
					<>
						<View>
							<View style={{ marginLeft: 20, marginTop: 20 }}>
								<ReturnArrow />
							</View>
							<View style={{ marginTop: 30, marginLeft: 10, marginRight: 20 }}>
								<SettingsList selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} settings={settings} />
							</View>
						</View>
						<MainWindow selectedIndex={selectedIndex} />
					</>
				)}
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}
