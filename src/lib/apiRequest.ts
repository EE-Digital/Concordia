export default async function apiRequest(method: "POST" | "GET", url: string, body?: any) {
	try {
		const response = await fetch(url, {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		if (response.status !== 200) return false;

		const data = await response.json();
		return data;
	} catch (e) {
		console.error("Error in apiRequest", e);
	}
}
