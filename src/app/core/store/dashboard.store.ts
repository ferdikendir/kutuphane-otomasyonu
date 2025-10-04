import { BookUser } from "@models/book-user.model";
import { Store } from "./base/store";

export interface DashboardStateModel {
  myBooks: BookUser[];
}

const initialState: DashboardStateModel = {
  myBooks: [],
};

const dashboardStore = new Store<DashboardStateModel>(initialState);

export const myBooks = dashboardStore.select(s => s.myBooks);

export const dispatchMyBooks = (newState: BookUser[]): void => {
  dashboardStore.set({ myBooks: newState });
};

export const clearMyBooks = () => dashboardStore.clear();
