export default async function getCameraStream() {
	const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

	return stream;
}
