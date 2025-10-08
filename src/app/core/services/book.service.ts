import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Book } from "@models/book.model";
import { environment } from "src/environments/environment";

@Injectable()
export class BookService {

  private readonly httpClient = inject(HttpClient);

  getAllBooks() {
    return this.httpClient.post<Book[]>(environment.apiUrl + 'Book/List', {});
  }

  insert(request: any) {
    return this.httpClient.post<Book>(environment.apiUrl + 'Book/Insert', request);
  }

  update(request: any) {
    return this.httpClient.post<Book>(environment.apiUrl + 'Book/Update', request);
  }
}
