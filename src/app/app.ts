import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG  } from 'primeng/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('BlanchisserieFrontend');

  primeNgConfig = inject(PrimeNG);

  ngOnInit() {
    this.primeNgConfig.ripple.set(true);
  } 

}
