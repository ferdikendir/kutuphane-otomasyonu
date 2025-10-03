import { User } from "@models/user.model";
import { Store } from "./base/store";

const initialState: Partial<User> = {};

const userStore = new Store<Partial<User>>(initialState);

export const user = userStore.select();

export const dispatchUser = (newState: Partial<User>): void => userStore.set(newState);
