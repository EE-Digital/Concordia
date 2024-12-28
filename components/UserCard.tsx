import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, Pressable, Text } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { Colors } from "../constants/Colors";
import T_User from "../types/user";
import { useEffect, useState } from "react";
import T_Server from "@/types/server";
import { launchImageLibrary } from "react-native-image-picker";
import { RectButton } from "react-native-gesture-handler";
import { uploadProfilePicture } from "@/handlers/profilePicture";

export default function UserCard(props: { user?: T_User; server?: T_Server }) {
	const [profilePicture, setProfilePicture] = useState({ uri: props?.server?.user?.profilePicture ? `${props.server.ip}/users/pfp/${props.server.user.profilePicture}` : "https://media1.tenor.com/m/tCL3HGcaV4UAAAAd/raccoon-dance.gif" });

	useEffect(() => {
		if (props.server?.user?.profilePicture) setProfilePicture({ uri: `${props.server.ip}/users/pfp/${props.server.user.profilePicture}` });
	}, [props.server]);

	const handleProfilePicture = () => {
		launchImageLibrary({ mediaType: "photo", includeBase64: false, selectionLimit: 1, quality: 0.5 }, (res) => {
			if (res.assets && res.assets[0].uri && props.server) {
				uploadProfilePicture(res.assets[0].uri, props.server.accessToken, props.server);
				setProfilePicture({ uri: res.assets[0].uri });
			}
		});
	};

	return (
		<View style={{ alignSelf: "flex-end", width: "100%", paddingHorizontal: 10, height: 60, backgroundColor: Colors.dark.background, flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingBottom: 10 }}>
			<RectButton onPress={handleProfilePicture} style={{ cursor: "pointer" }}>
				<ExpoImage source={profilePicture} style={{ width: 45, height: 45, borderRadius: 10 }} />
			</RectButton>
			<View style={{ flex: 1 }} />
			<Text style={{ color: Colors.dark.text, fontWeight: 600, fontSize: 18 }}>{props.user?.username ?? ""}</Text>
			<View style={{ flex: 1 }} />
			<Pressable
				onPress={() => {
					router.push("/settings/settings");
				}}>
				<View
					style={{
						width: 25,
						height: 25,
					}}>
					<MaterialIcons name="settings" size={25} color={"#ddd"} />
				</View>
			</Pressable>
		</View>
	);
}
