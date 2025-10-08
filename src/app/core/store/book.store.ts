import { Book } from "@models/book.model";
import { Store } from "./base/store";
import { BookService } from "@services/book.service";

export interface BookStateModel {
  books: Book[];
}

const initialState: BookStateModel = {
  books: [],
};

const bookStore = new Store<BookStateModel>(initialState);


export const books = bookStore.select(s => s.books as Book[]);

export const dispatchBooks = (bookService: BookService): void => {
  const snapshot = bookStore.snapshot();
  bookService.getAllBooks().subscribe(books => bookStore.set({ ...snapshot, books }));
};

export const clearBooks = (): void => {
  bookStore.clear();
};
