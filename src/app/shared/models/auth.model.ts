import { User } from "./user.model";

export interface AuthRequestModel {
  name: string;
  surname: string;
  username: string;
  password: string;
}

export interface LoginRequestModel {
  username: string;
  password: string;
}

export interface LoginResponseModel {
  token: string;
  user: User;
}
