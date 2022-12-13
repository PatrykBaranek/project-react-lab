export interface IPost {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export interface IComment {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
}

export interface IPhoto {
	albumId: number;
	id: number;
	thumbnailUrl: string;
	title: string;
	url: string;
}

export enum MethodType {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE',
}
