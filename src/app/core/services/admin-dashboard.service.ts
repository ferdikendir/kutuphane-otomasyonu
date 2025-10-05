import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BookUser } from "@models/book-user.model";
import { Book } from "@models/book.model";
import { User } from "@models/user.model";
import { Observable } from "rxjs";

@Injectable()
export class AdminDashboardService {

  private readonly httpClient = inject(HttpClient);

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('assets/mock-data/users.json');
  }

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('assets/mock-data/books.json');
  }

  getAllBookUsers(): Observable<BookUser[]> {
    return this.httpClient.get<BookUser[]>('assets/mock-data/book-users.json');
  }

}
