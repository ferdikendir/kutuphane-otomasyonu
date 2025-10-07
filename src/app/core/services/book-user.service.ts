import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { BookUser } from '@models/book-user.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookUserService {

  private readonly httpClient = inject(HttpClient);

  insert(request: BookUser) {
    return this.httpClient.post<BookUser>(environment.apiUrl + 'book-user/insert', request);
  }

  update(request: BookUser) {
    return this.httpClient.post<BookUser>(environment.apiUrl + 'book-user/update', request);
  }

  list() {
    return this.httpClient.post<BookUser[]>(environment.apiUrl + 'book-user/list', {});
  }

}
