import type { LocalData } from "../types/LocalData";

export function saveLocalData(localData: LocalData) {
	localStorage.setItem("localData", JSON.stringify(localData));
}

export function loadLocalData(): LocalData {
	return localStorage.getItem("localData") ? JSON.parse(localStorage.getItem("localData")!) : { servers: [] };
}
