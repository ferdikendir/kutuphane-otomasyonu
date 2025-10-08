import { User } from "@models/user.model";
import { Store } from "./base/store";
import { UserService } from "@services/user.service";

export interface UserListStateModel {
  users: User[];
}

const initialState: UserListStateModel = {
  users: [],
};

const userStore = new Store<UserListStateModel>(initialState);


export const userList = userStore.select(s => s.users as User[]);

export const dispatchUserList = (userService: UserService): void => {
  const snapshot = userStore.snapshot();
  userService.userList().subscribe(users => userStore.set({ ...snapshot, users }));
};

export const clearUserList = (): void => {
  userStore.clear();
};
