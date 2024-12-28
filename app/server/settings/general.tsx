import { View } from "react-native";
import ServerPageLabel from "../../../components/ServerPageLabel";
import Server from "../../../types/server";
import SettingsTextInput from "../../../components/inputs/StyledTextInput";

export default function GeneralServerSettings(props: { server: Server }) {
	const server: Server = props.server;
	console.log(server);

	return (
		<View
			style={{
				flex: 1,
				width: "100%",
			}}>
			<ServerPageLabel title="General" />
			<SettingsTextInput label="Description" width={300} text={server.title} />
		</View>
	);
}
