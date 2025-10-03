import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { BookUser } from "@models/book-user.model";
import { map } from "rxjs";

@Injectable()
export class DashboardService {

  private readonly httpClient = inject(HttpClient);

  getMyBooks(userId: string) {
    return this.httpClient.get<BookUser[]>('assets/mock-data/book-users.json').pipe(
      map((bookUsers: BookUser[]) => bookUsers.filter(bu => bu.userId === userId))
    );
  }
}
