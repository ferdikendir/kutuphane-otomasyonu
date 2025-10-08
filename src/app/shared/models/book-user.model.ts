import { Book } from "./book.model";
import { User } from './user.model';

export interface BookUser {
  id?: string;
  user_id: string;
  user?: User;
  book_id: string;
  book?: Book;
  borrowedDate: string;
  dueDate: string;
  returned?: boolean;
}
