import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClientOrder } from '../../models/client-order';
import { OrderService } from '../../services/order';
import { AuthService } from '../../services/auth';
import { OrderStatus } from '../../models/order-status';

@Component({
  selector: 'app-my-orders',
  imports: [TableModule, CurrencyPipe],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
  export class MyOrders implements OnInit {
    orderStatus = OrderStatus;
    private _orders = signal<ClientOrder[]>([]);
    orders = this._orders.asReadonly();
    loading = true;
    private orderService = inject(OrderService);
    private authService = inject(AuthService);

    ngOnInit() {
      const user = this.authService.currentUser();
      if (user) {
        this.orderService.getClientOrdersByUserId(user.id).subscribe({
          next: (orders: ClientOrder[]) => {
            console.log('Fetched orders:', orders);
            this._orders.set(orders);
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
      } else {
        this.loading = false;
      }
    }
}
