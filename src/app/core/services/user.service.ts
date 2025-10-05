import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable()
export class UserService {

  private readonly httpClient = inject(HttpClient);

  getAllUsers() {
    return this.httpClient.get('assets/mock-data/users.json');
  }

}
