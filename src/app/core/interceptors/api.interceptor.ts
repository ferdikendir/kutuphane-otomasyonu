import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {

  const toastrService = inject(ToastrService);


  return next(req.clone()).pipe(
    catchError((error: any) => {
      if (error instanceof HttpErrorResponse) {
        console.error('API Error:', error);
        if (error.status === 400) {
          toastrService.error(error.error.message, 'Error')
        }
      }

      return throwError(error);
    })
  );
};
