import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@models/user.model";
import { Observable, map, tap } from "rxjs";
import { dispatchUser } from "@store/user.store";
import { AuthRequestModel, LoginRequestModel, LoginResponseModel } from "@models/auth.model";
import { environment } from "src/environments/environment";

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

  login(request: LoginRequestModel): Observable<User> {

    return this.httpClient.post<LoginResponseModel>(environment.apiUrl + 'auth/login', request).pipe(
      tap(response => {
        this.isAuthenticated = !!response.token;
        this.setLocalStorage(response);
        dispatchUser(response.user ?? {});
        this.router.navigate([
          response.user?.role === 'admin' ? '/admin-dashboard' : '/dashboard'
        ]);
      }),
      map(response => response.user)
    );

  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) as User : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  private setLocalStorage(loginResponse: LoginResponseModel): void {
    localStorage.setItem('user', JSON.stringify(loginResponse.user));
    localStorage.setItem('token', loginResponse.token);
  }

  register(request: AuthRequestModel): Observable<User> {
    return this.httpClient.post<User>(environment.apiUrl + 'auth/register', request);
  }

}
