import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@services/auth.service";

export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isLoggedIn() ?? false;

  if (isAuthenticated) {
    return router.parseUrl('/dashboard');
  }

  return true;
};
