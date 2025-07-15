import { Component, effect, inject, signal } from '@angular/core';
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
  isAdminOrderPage = signal(true);
  orderUpdated = signal<ClientOrder | null>(null);

  constructor() {
    effect(() => {
      const updatedOrder = this.orderUpdated();
      if (updatedOrder) {
        const currentOrders = this._orders();
        const index = currentOrders.findIndex((clientOrder: ClientOrder) => clientOrder.id === updatedOrder.id);
        if (index !== -1) {
          const newOrders = [...currentOrders];
          newOrders[index] = updatedOrder;
          this._orders.set(newOrders);
        }
        this.orderUpdated.set(null);
      }
    });
  }

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
