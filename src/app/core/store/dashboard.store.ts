import { BookUser } from "@models/book-user.model";
import { Store } from "./base/store";
import { BookUserService } from "@services/book-user.service";

export interface DashboardStateModel {
  myBooks: BookUser[];
}

const initialState: DashboardStateModel = {
  myBooks: [],
};

const dashboardStore = new Store<DashboardStateModel>(initialState);

export const myBooks = dashboardStore.select(s => s.myBooks as BookUser[]);

export const dispatchMyBooks = (dashboardService: BookUserService): void => {
  const snapshot = dashboardStore.snapshot();
  dashboardService.getMyBooks().subscribe(myBooks => dashboardStore.set({ ...snapshot, myBooks }));
};

export const clearMyBooks = (): void => {
  dashboardStore.clear();
};
