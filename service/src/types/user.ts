import { Identifiable } from "./common";

export interface UserBase {
  name: string;
  quantity: number;
  purchased: boolean;
}

export interface UserResolved extends UserBase, Identifiable { }

export interface GetUserParams extends Identifiable { }

export interface DeleteUserParams extends Identifiable { }

export interface UpdateUserParams extends Identifiable { }

export interface UpdateUserBody extends UserResolved { }

export interface PostUserBody extends UserBase { }
