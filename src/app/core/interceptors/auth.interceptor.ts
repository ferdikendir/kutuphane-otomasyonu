import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.getToken()}`
    }
  });

  return next(clonedReq).pipe(catchError(errorObj => {
    console.log('Error intercepted:', errorObj);
    if (
      errorObj instanceof HttpErrorResponse &&
      errorObj.status === 401
    ) {
      authService.logout();
      router.parseUrl('/auth/login');
    }
    return throwError(errorObj.error);
  }));
};
