import { BookUser } from "@models/book-user.model";
import { Store } from "./base/store";
import { BookUserService } from "@services/book-user.service";

export interface BookUserStateModel {
  bookUsers: BookUser[];
}

const initialState: BookUserStateModel = {
  bookUsers: [],
};

const bookUserStore = new Store<BookUserStateModel>(initialState);

export const bookUsers = bookUserStore.select(s => s.bookUsers as BookUser[]);

export const dispatchBookUsers = (bookUserService: BookUserService): void => {
  const snapshot = bookUserStore.snapshot();
  bookUserService.list().subscribe(bookUsers => bookUserStore.set({ ...snapshot, bookUsers }));
};

export const clearBookUsers = (): void => {
  bookUserStore.clear();
};
