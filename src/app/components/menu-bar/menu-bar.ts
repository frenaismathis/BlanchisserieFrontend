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
  username: string | undefined;
  isDarkMode = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Initialize dark mode from localStorage
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.applyDarkModeClass();

    if(this.authService.currentUser()){
        this.username = this.authService.currentUser()!.firstname + ' ' + this.authService.currentUser()!.lastname
    }
    this.setMenuItems();
  }

  setMenuItems() {
    this.items = [
      {
        label: 'Gérer les commandes utilisateurs',
        icon: 'pi pi-wrench',
        routerLink: '/admin/orders',
        visible: this.authService.isAdmin(),
      },
      {
        label: 'Mes commandes',
        icon: 'pi pi-receipt',
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
        icon: this.isDarkMode ? 'pi pi-moon' : 'pi pi-sun',
        command: () => {
          this.toggleDarkMode();
        },
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
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');
    this.applyDarkModeClass();
    this.setMenuItems();
  }

  applyDarkModeClass() {
    const element = document.querySelector('html');
    if (this.isDarkMode) {
      element?.classList.add('my-app-dark');
    } else {
      element?.classList.remove('my-app-dark');
    }
  }
}
