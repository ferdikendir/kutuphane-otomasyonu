export interface Book {
  isbn: string;
  name: string;
  author: string
  edition: string;
  year: number;
  available?: boolean;
  availableInfo?: string;
}
