import { useState } from "react";
import { View } from "react-native";
import SettingsSwitchButton from "../../components/inputs/StyledSwitchButton";
import { LocalSettings, updateServerData } from "../../handlers/storage";
import ServerPageLabel from "../../components/ServerPageLabel";
import StyledButton from "@/components/inputs/StyledButton";

export default function UISettings(props: { preload: Function }) {
	const [state, setState] = useState(props.preload().LinkInNative ?? false);
	const sendUpdate = async (newState: boolean) => {
		const PORT = require("../../electron/LocalServer.json").port;
		try {
			await fetch(`http://127.0.0.1:${PORT}/settings/setNewWindow`, {
				method: "POST",
				headers: {
					"Accept": "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					newState: newState,
				}),
			});
			LocalSettings.update();
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				width: "100%",
			}}>
			<ServerPageLabel title="UI/UX" />
			<SettingsSwitchButton setState={setState} state={state} label="Open links in native browser" style={{ flexDirection: "row", width: 400, justifyContent: "space-between" }} onPress={sendUpdate} />
			<View style={{ height: 5 }} />
			<StyledButton
				label={"Update server data"}
				width={150}
				onPress={() => {
					updateServerData();
				}}
			/>
		</View>
	);
}
