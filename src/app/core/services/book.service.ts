import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Book } from "@models/book.model";

@Injectable()
export class BookService {

  private readonly httpClient = inject(HttpClient);

  getAllBooks() {
    return this.httpClient.get<Book[]>('assets/mock-data/books.json');
  }
}
