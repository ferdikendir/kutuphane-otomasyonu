import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Author } from "@models/author.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthorService {

  private readonly httpClient = inject(HttpClient);

  list(): Observable<Author[]> {
    return this.httpClient.post<Author[]>(environment.apiUrl + 'author/list', {});
  }

}
