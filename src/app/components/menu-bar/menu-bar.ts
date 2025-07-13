import { Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-menu-bar',
  imports: [MenubarModule, RouterLink],
  standalone: true,
  templateUrl: './menu-bar.html',
  styleUrl: './menu-bar.css',
  encapsulation: ViewEncapsulation.None,
})
export class MenuBar {
  items: MenuItem[] | undefined;
  private authService = inject(AuthService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Mes commandes',
        icon: 'pi pi-truck',
        routerLink: '/my-orders',
      },
      {
        label: 'Articles',
        icon: 'pi pi-shopping-bag',
        routerLink: '/catalog',
      },
      {
        icon: 'pi pi-shopping-cart',
        label: 'Panier',
        routerLink: '/cart',
      },
      {
        label: 'Déconnexion',
        icon: 'pi pi-power-off',
        command: () => {
          this.authService.logout().subscribe(() => {
            this.router.navigateByUrl('/login');
          });
        },
      }
    ];
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
  }
}
