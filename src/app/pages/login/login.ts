
import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [InputTextModule, ButtonModule, CardModule, FormsModule]
})
export class Login {

  email = '';
  password = '';
  showPassword = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Expose loading state from AuthService
  loading = this.authService.loading;
  error = this.authService.error;

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Logged in successfully');
        this.router.navigateByUrl('/');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login failed', error);
      }
    });
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
  }


}
