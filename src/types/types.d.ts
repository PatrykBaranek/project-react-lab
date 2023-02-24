export interface IPost {
  id: string;
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
  title?: string;
}

export interface IPhoto {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  adress: IAdress;
  phone: string;
  website: string;
  company: ICompany;
}

export enum MethodType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
