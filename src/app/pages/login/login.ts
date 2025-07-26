import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
  imports: [
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CardModule,
    FormsModule
  ],
})
export class Login implements OnInit {
  email = '';
  password = '';
  showPassword = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = this.authService.loading;
  error = this.authService.error;

  ngOnInit(): void {
    if (this.authService.isConnected()) {
      this.router.navigateByUrl('/catalog');
    }
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/catalog');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login failed', error);
      },
    });
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
  }
}
