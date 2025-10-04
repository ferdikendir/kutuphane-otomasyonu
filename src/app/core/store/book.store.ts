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

export const addBook = (newBook: Book): void => {
  bookStore.update(state => ({ books: [...state.books, newBook] }));
};

export const updateBook = (updatedBook: Book): void => {
  bookStore.update(state => ({
    books: state.books.map(book =>
      book.isbn === updatedBook.isbn ? updatedBook : book
    )
  }));
};

export const removeBook = (isbn: string): void => {
  bookStore.update(state => ({
    books: state.books.filter(book => book.isbn !== isbn)
  }));
}
