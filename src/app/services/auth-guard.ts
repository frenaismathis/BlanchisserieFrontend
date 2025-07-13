import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  // Si l'utilisateur n'est pas connu, tente de le restaurer côté serveur (synchrone ici, mais à adapter si besoin)
  if (!auth.currentUser()) {
    // Attend la restauration de session si nécessaire
    try {
      await firstValueFrom(auth.checkAuth());
    } catch {}
    if (!auth.currentUser()) {
      return router.createUrlTree(['/login']);
    }
  }
  const expectedRole = route.data['role'];
  const currentUser = auth.currentUser();
  if (
    expectedRole &&
    (!currentUser ||
      !currentUser.role ||
      currentUser.role.name !== expectedRole)
  ) {
    return router.createUrlTree(['/login']);
  }
  return true;
};
