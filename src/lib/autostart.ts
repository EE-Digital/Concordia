import { enable, isEnabled, disable } from "@tauri-apps/plugin-autostart";

export function isAutostartEnabled(): Promise<boolean> {
	return isEnabled();
}

export function enableAutostart(): Promise<void> {
	return enable();
}

export function disableAutostart(): void {
	disable();
}

export async function toggleAutostart(): Promise<boolean> {
	const enabled = await isAutostartEnabled();
	enabled ? disableAutostart() : enableAutostart();
	return !enabled;
}
