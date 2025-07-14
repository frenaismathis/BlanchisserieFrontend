import { Routes } from '@angular/router';
import { RoleEnum } from './models/role';
import { Login } from './pages/login/login';
import { Catalog } from './pages/catalog/catalog';
import { Cart } from './pages/cart/cart';
import { AdminOrders } from './pages/admin-orders/admin-orders';
import { authGuard } from './services/auth-guard';
import { MyOrders } from './pages/my-orders/my-orders';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'catalog', component: Catalog, canActivate: [authGuard] },
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: 'my-orders', component: MyOrders, canActivate: [authGuard] },
  { path: 'admin/orders', component: AdminOrders, canActivate: [authGuard], data: { role: RoleEnum.Admin } },
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: '**', redirectTo: '/catalog' },
];
