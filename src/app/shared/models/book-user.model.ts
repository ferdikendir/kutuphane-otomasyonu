import { Book } from "./book.model";
import { User } from './user.model';

export interface BookUser {
  isbn: string;
  book: Book;
  userId: string;
  user: User;
  date: string;
  deadline: string;
}
