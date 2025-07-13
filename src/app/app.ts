import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth';
import { MenuBar } from './components/menu-bar/menu-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('BlanchisserieFrontend');
  protected readonly auth = inject(AuthService);
}
