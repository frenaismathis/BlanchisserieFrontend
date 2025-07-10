import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Catalog } from './pages/catalog/catalog';
import { Cart } from './pages/cart/cart';
import { AdminOrders } from './pages/admin-orders/admin-orders';
import { authGuard } from './services/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'catalog', component: Catalog, canActivate: [authGuard], data: { role: 'User' } },
  { path: 'cart', component: Cart, canActivate: [authGuard], data: { role: 'User' } },
  { path: 'admin/orders', component: AdminOrders, canActivate: [authGuard], data: { role: 'Admin' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
