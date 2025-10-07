import { Author } from "./author.model";

export interface Book {
  isbn: string;
  title: string;
  author: Author;
  edition: string;
  year: number;
  available?: boolean;
  availableInfo?: string;
}
