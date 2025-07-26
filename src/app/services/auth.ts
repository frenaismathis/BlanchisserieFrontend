import { Injectable, inject, signal, computed } from '@angular/core';
import { RoleEnum } from '../models/role';
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
  isAdmin = computed(() => {
    return this.currentUser()?.role.name === RoleEnum.Admin
  });
  private _loading = signal(false);
  loading = this._loading.asReadonly();

  private _error = signal<{ status?: number; } | null>(null);
  error = this._error.asReadonly();

  checkAuth(): Observable<User | null> {
    return this.http
      .get<User>('http://localhost:5150/api/auth/me')
      .pipe(
        tap({
          next: (user: User) => {
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
        { email, password }
      )
      .pipe(
        tap({
          next: (user: User) => {
            // Tokens are automatically stored in HTTP-only cookies
            this._currentUser.set(user);
            this._loading.set(false);
          },
          error: (error) => {
            this._loading.set(false);
            this._error.set(error);
          },
        }),
      );
  }

  logout(): Observable<any> {
    return this.http
      .post<any>('http://localhost:5150/api/auth/logout', {})
      .pipe(
        tap(() => {
          this._currentUser.set(null);
        }),
      );
  }
}
