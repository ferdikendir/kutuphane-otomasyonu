import { Component, computed, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { clearBooks } from "@store/book.store";
import { clearMyBooks } from "@store/dashboard.store";
import { clearUser, user } from "@store/user.store";
import { AuthService } from "@services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "library-header",
  template: `
    <div class="flex justify-between">
    <p class="grow-1">
      Welcome to the Dashboard! {{ userStore().name }}
    </p>
    <button mat-flat-button color="warn" (click)="logout()">Çıkış yap</button>
  </div>
  `,
  styles: `
  :host {
    display: block;
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: bold;
  }
  `,
  standalone: true,
  imports: [
    MatButtonModule
  ]
})
export class HeaderComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  userStore = computed(() => user());

  logout = () => {
    this.authService.logout();

    clearMyBooks();
    clearBooks();
    clearUser();

    this.router.navigateByUrl("/auth/login");

  }

}
