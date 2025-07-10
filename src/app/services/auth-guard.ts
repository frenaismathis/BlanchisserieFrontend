import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isConnected()) {
    return router.createUrlTree(['/login']);
  }
  const expectedRole = route.data['role'];
  const currentUser = auth.currentUser();
  if (expectedRole && (!currentUser || !currentUser.role || currentUser.role.name !== expectedRole)) {
    return router.createUrlTree(['/login']);
  }
  return true;
};
