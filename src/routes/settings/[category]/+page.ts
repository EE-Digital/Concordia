import type { PageLoad } from "./$types";

export type SettingsCategory = {
	data: {
		category: string;
	};
};

export const load: PageLoad = async ({ params }) => {
	// switch (params.category) {
	// 	case "user":
	// 		return { title: "User Settings" };
	// 	case "identities":
	// 		return { title: "User Settings" };
	// }
	return { category: params.category };
};
