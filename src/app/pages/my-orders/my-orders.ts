import { Component, inject, OnInit, signal } from '@angular/core';
import { ClientOrder } from '../../models/client-order';
import { OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';
import { ListOrders } from '../../components/list-orders/list-orders';

@Component({
  selector: 'app-my-orders',
  imports: [ListOrders],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
  standalone: true,
})
export class MyOrders implements OnInit {
  private _orders = signal<ClientOrder[]>([]);
  orders = this._orders.asReadonly();
  private _loading = signal(true);
  loading = this._loading.asReadonly();
  private orderService = inject(OrderService);
  private authService = inject(AuthService);

  ngOnInit() {
    const user = this.authService.currentUser();
    if (user) {
      this.orderService.getClientOrdersByUserId(user.id).subscribe({
        next: (orders: ClientOrder[]) => {
          this._orders.set(orders);
          this._loading.set(false);
        },
        error: () => {
          this._loading.set(false);
        }
      });
    } else {
      this._loading.set(false);
    }
  }

  

}
