import { invoke } from "@tauri-apps/api/core";

const generateKeys = async (keyId: string) => {
	const result = await invoke("create_rsa_keys", { keyId });
	console.log(result);
};

const sign = async (payload: string, keyId: string) => {
	const result = await invoke("sign", {
		payload,
		keyId,
	});
	console.log(result);
};

export { generateKeys, sign };
