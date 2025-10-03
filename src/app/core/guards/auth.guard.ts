import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "@services/auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);


  const isAuthenticated = authService.isLoggedIn() ?? false;

  if (!isAuthenticated) {
    return router.parseUrl('/auth/login');
  }

  return true;
}
