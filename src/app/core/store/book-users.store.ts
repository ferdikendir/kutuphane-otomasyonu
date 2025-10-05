import { books } from '@store/book.store';
import { BookUser } from "@models/book-user.model";
import { Store } from "./base/store";
import { User } from "@models/user.model";
import { Book } from '@models/book.model';

export interface AdminDashboardStateModel {
  bookUsers?: BookUser[];
  users?: User[];
  books?: Book[];
}

const initialState: AdminDashboardStateModel = {
  bookUsers: [],
  users: [],
  books: []
};


const adminDashboardStore = new Store<AdminDashboardStateModel>(initialState);

export const allBookUsers = adminDashboardStore.select(s => s.bookUsers as BookUser[]);

export const dispatchAllBookUsers = (newState: BookUser[]): void => {
  const snapshot = adminDashboardStore.snapshot();
  adminDashboardStore.set({ ...snapshot, bookUsers: newState });
};

export const allUsers = adminDashboardStore.select(s => s.users as User[]);

export const dispatchAllUsers = (newState: User[]): void => {
  const snapshot = adminDashboardStore.snapshot();
  adminDashboardStore.set({ ...snapshot, users: newState });
};

export const allBooks = adminDashboardStore.select(s => s.books as Book[]);

export const dispatchAllBooks = (newState: Book[]): void => {
  const snapshot = adminDashboardStore.snapshot();
  adminDashboardStore.set({ ...snapshot, books: newState });
};
