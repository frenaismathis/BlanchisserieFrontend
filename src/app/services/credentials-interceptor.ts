import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // Adds withCredentials: true to all HTTP requests
  const cloned = req.clone({ withCredentials: true });
  return next(cloned);
};
