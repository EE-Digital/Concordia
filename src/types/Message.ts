import type { Member } from "./Member";

export type Message = {
	id: string;
	text?: string;
	file?: File;
	authorId: string;
	channelId: string;
	createdAt: "2025-03-03T10:34:59.591Z";
	updatedAt: "2025-03-03T10:34:59.591Z";
	author: Member;
};

export type File = {
	id: string;
	filename: string;
	mimetype: string;
	path: string;
	author: Member;
};
