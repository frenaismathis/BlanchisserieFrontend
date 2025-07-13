import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // Ajoute withCredentials: true à toutes les requêtes HTTP
  const cloned = req.clone({ withCredentials: true });
  return next(cloned);
};
