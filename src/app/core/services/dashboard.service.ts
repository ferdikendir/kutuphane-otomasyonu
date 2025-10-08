import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BookUser } from "@models/book-user.model";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class DashboardService {

  private readonly httpClient = inject(HttpClient);

  getMyBooks() {
    return this.httpClient.post<BookUser[]>(environment.apiUrl + 'book_user/get_my_book_list', {});
  }
}
