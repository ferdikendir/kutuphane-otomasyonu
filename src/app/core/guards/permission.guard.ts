import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { User } from '@models/user.model';
import { user } from "@store/user.store";

export const permissionGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const router = inject(Router);

  const userState = user() as User;

  const requiredRoles = route.data['roles'] as Array<string>;

  const hasPermission = requiredRoles ? requiredRoles.includes(userState.role) : true;

  if (!hasPermission) {
    return router.parseUrl('/error-403');
  }

  return hasPermission;

};
