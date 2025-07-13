import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();
  isConnected = computed(() => this.currentUser() !== null);

  // Loading state for login
  private _loading = signal(false);
  loading = this._loading.asReadonly();

  private _error = signal('');
  error = this._error.asReadonly();

  // Vérifie l'utilisateur courant côté serveur (appelée au démarrage de l'app)
  checkAuth(): Observable<User | null> {
    return this.http
      .get<User>('http://localhost:5150/api/auth/me', {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (user) => {
            this._currentUser.set(user);
          },
          error: () => {
            this._currentUser.set(null);
          },
        }),
      );
  }

  login(email: string, password: string): Observable<User> {
    this._loading.set(true);
    return this.http
      .post<User>(
        'http://localhost:5150/api/auth/login',
        { email, password },
        { withCredentials: true },
      )
      .pipe(
        tap({
          next: (user) => {
            // Les deux tokens sont automatiquement stockés dans des cookies HTTP-only
            // Nous mettons à jour l'état de l'utilisateur connecté
            this._currentUser.set(user);
            this._loading.set(false);
            console.log(user);
          },
          error: (error) => {
            this._loading.set(false);
            this._error.set(error.message);
          },
        }),
      );
  }

  // Méthode pour rafraîchir les tokens. Utilisée par l'intercepteur HTTP
  revokeToken(): Observable<any> {
    return this.http
      .post<any>(
        'http://localhost:5150/api/auth/revoke-token',
        {},
        { withCredentials: true },
      )
      .pipe(
        tap((response) => {
          // Les nouveaux tokens sont automatiquement stockés dans des cookies HTTP-only
          console.log('Tokens refreshed successfully');
        }),
      );
  }

  logout(): Observable<any> {
    return this.http
      .post<any>(
        'http://localhost:5150/api/auth/logout',
        {},
        { withCredentials: true },
      )
      .pipe(
        tap(() => {
          // Le backend devrait supprimer les cookies
          this._currentUser.set(null);
        }),
      );
  }
}
