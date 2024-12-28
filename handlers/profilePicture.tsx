import T_Server from "@/types/server";

export async function uploadProfilePicture(base64Image: string, accesstoken: string, server: T_Server) {
	// Decode base64 to binary
	const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
	const binaryData = atob(base64Data);

	// Create a Uint8Array from the binary data
	const arrayBuffer = new Uint8Array(binaryData.length);
	for (let i = 0; i < binaryData.length; i++) {
		arrayBuffer[i] = binaryData.charCodeAt(i);
	}

	// Create a Blob or File from the binary data
	const file = new File([arrayBuffer], "image.png", { type: "image/png" });

	// Prepare FormData
	const formData = new FormData();
	formData.append("pfp", file);

	// Send the request
	await fetch(`${server.ip}/users/pfp`, {
		method: "POST",
		headers: {
			accesstoken: server.accessToken,
		},
		body: formData,
	});
}
