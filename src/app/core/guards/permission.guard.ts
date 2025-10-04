import { user } from '@modules/core/store/user.store';
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "@services/auth.service";
import { User } from '@models/user.model';

export const permissionGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getCurrentUser() as User;

  const requiredRoles = route.data['roles'] as Array<string>;

  const hasPermission = requiredRoles ? requiredRoles.includes(user.role) : true;

  if (!hasPermission) {
    return router.parseUrl('/error-403');
  }

  return hasPermission;

};
