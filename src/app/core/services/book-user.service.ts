import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { BookUser } from '@models/book-user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookUserService {

  private readonly httpClient = inject(HttpClient);

  insert(request: BookUser) {
    return this.httpClient.post<BookUser>(environment.apiUrl + 'BookUser/Insert', request);
  }

  update(request: BookUser) {
    return this.httpClient.post<BookUser>(environment.apiUrl + 'BookUser/Update', request);
  }

  list() {
    return this.httpClient.post<BookUser[]>(environment.apiUrl + 'BookUser/List', {});
  }

  checkBook(id: string): Observable<boolean> {
    return this.httpClient.post<boolean>(environment.apiUrl + 'BookUser/CheckBook', { id });
  }

  returnBook(request: { id: string }): Observable<BookUser> {
    return this.httpClient.post<BookUser>(environment.apiUrl + 'BookUser/MarkAsReturned', request);
  }

  getMyBooks() {
    return this.httpClient.post<BookUser[]>(environment.apiUrl + 'BookUser/MyBookList', {});
  }

}
