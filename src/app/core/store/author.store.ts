import { Author } from "@models/author.model";
import { Store } from "./base/store";
import { AuthorService } from "@services/author.service";

export interface AuthorStateModel {
  authors: Author[];
}

const initialState: AuthorStateModel = {
  authors: [],
};

const authorStore = new Store<AuthorStateModel>(initialState);


export const authors = authorStore.select(s => s.authors as Author[]);

export const dispatchAuthors = (authorService: AuthorService): void => {
  const snapshot = authorStore.snapshot();
  authorService.list().subscribe(authors => authorStore.set({ ...snapshot, authors }));
};

export const clearAuthors = (): void => {
  authorStore.clear();
};
