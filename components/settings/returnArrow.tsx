import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View } from "react-native";

export default function ReturnArrow() {
	return (
		<Link href={"/"} style={{ width: 30, height: 30 }}>
			<View style={{ width: 30, height: 30, borderRadius: 30, borderColor: "white", borderWidth: 2, justifyContent: "center", alignItems: "center" }}>
				<MaterialIcons name="arrow-back" size={20} color={"white"} />
			</View>
		</Link>
	);
}
