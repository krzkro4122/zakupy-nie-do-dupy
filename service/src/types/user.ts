import { Identifiable } from "./common";

export interface UserBase {
  email?: string;
  password: string;
  verified: boolean;
  emailVisibility: boolean;
  name: string;
  avatar: string;
  // created:
  // updated:
}

export interface UserResolved extends UserBase, Identifiable { }

export interface GetUserParams extends Identifiable { }

export interface DeleteUserParams extends Identifiable { }

export interface UpdateUserParams extends Identifiable { }

export interface UpdateUserBody extends UserResolved { }

export interface PostUserBody extends UserBase { }
