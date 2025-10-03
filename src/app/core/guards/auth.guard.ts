import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {


  const isAuthenticated = false;

  if (!isAuthenticated && state.url !== '/auth/login') {
    return false;
  }

  return true;
}
