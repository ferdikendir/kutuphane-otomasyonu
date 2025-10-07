import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BookUser } from "@models/book-user.model";
import { Book } from "@models/book.model";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class BookService {

  private readonly httpClient = inject(HttpClient);

  getAllBooks() {
    return this.httpClient.post<Book[]>(environment.apiUrl + 'book/list', {});
  }

  getBookByIsbn(isbn: string): Observable<BookUser> {
    return this.httpClient.get<BookUser[]>(`assets/mock-data/book-users.json`).pipe(
      map((books: BookUser[]) => books.find(book => book.isbn === isbn) as BookUser)
    );
  }

  insert(request: any) {
    return this.httpClient.post<Book>(environment.apiUrl + 'book/insert', request);
  }
}
