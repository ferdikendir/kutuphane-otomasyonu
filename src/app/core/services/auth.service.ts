import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@models/user.model";
import { Observable, map, tap } from "rxjs";
import { dispatchUser } from "@modules/core/store/user.store";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  private isAuthenticated = false;

  constructor() {
    const user = this.getCurrentUser();
    this.isAuthenticated = !!user;
    if (this.isLoggedIn()) {
      dispatchUser(user ?? {});
    }
  }

  login(username: string, password: string): Observable<User | undefined> {

    return this.httpClient.get<User[]>('assets/mock-data/users.json').pipe(
      map(users => users.find((user: User) => user.username === username && user.password === password)),
      tap(user => {
        this.isAuthenticated = !!user;

        localStorage.setItem('user', JSON.stringify(user));
        dispatchUser(user ?? {});
        this.router.navigate(['/dashboard']);

      })
    );

  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) as User : null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

}
