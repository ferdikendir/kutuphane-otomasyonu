import { Book } from "@models/book.model";
import { Store } from "./base/store";

export interface BookStateModel {
  books: Book[];
}

const initialState: BookStateModel = {
  books: [],
};

const bookStore = new Store<BookStateModel>(initialState);

export const books = bookStore.select(s => s.books);

export const dispatchBooks = (newState: Book[]): void => {
  bookStore.set({ books: newState });
};
