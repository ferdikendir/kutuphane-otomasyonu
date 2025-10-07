import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { User } from "@models/user.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {

  private readonly httpClient = inject(HttpClient);

  userList(): Observable<User[]> {
    return this.httpClient.post<User[]>(environment.apiUrl + "user/list", {});
  }

}
