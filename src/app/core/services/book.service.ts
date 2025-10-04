import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BookUser } from "@models/book-user.model";
import { Book } from "@models/book.model";
import { Observable, map } from "rxjs";

@Injectable()
export class BookService {

  private readonly httpClient = inject(HttpClient);

  getAllBooks() {
    return this.httpClient.get<Book[]>('assets/mock-data/books.json');
  }

  getBookByIsbn(isbn: string): Observable<BookUser> {
    return this.httpClient.get<BookUser[]>(`assets/mock-data/book-users.json`).pipe(
      map((books: BookUser[]) => books.find(book => book.isbn === isbn) as BookUser)
    );
  }
}
