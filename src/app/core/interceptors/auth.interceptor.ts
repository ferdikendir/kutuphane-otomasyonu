import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Sahte token
  const fakeToken = 'Bearer my-fake-token';

  // Yeni request klonla ve header ekle
  const clonedReq = req.clone({
    setHeaders: {
      Authorization: fakeToken
    }
  });

  // Devam et
  return next(clonedReq);
};
