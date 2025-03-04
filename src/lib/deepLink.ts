import { onOpenUrl } from "@tauri-apps/plugin-deep-link";

export async function initDeeplinks() {
	await onOpenUrl((urls) => {
		console.log("Received deeplink:", urls);
		// Handle the deeplink here
	});
}
