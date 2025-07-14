import { Component, inject, signal } from '@angular/core';
import { OrderService } from '../../services/order';
import { ClientOrder } from '../../models/client-order';
import { ListOrders } from '../../components/list-orders/list-orders';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.html',
  styleUrl: './admin-orders.css',
  imports: [ListOrders],
  standalone: true,
})
export class AdminOrders {
  
  orderService = inject(OrderService);
  private _orders = signal<ClientOrder[]>([]);
  orders = this._orders.asReadonly();
  private _loading = signal(true);
  loading = this._loading.asReadonly();

  ngOnInit() {
    this.orderService.getClientOrders().subscribe({
      next: (orders: ClientOrder[]) => {
        this._orders.set(orders);
        this._loading.set(false);
      },
      error: () => {
        this._loading.set(false);
      }
    });
  }

}
