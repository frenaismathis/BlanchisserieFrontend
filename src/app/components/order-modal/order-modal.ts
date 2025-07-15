import { Component, inject, model, OnInit } from '@angular/core';
import { ClientOrder } from '../../models/client-order';
import { CardModule } from 'primeng/card';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OrderStatus } from '../../models/order-status';
import { OrderStatusLabel } from '../../models/order-status-label';
import { DataViewModule } from 'primeng/dataview';
import { AuthService } from '../../services/auth';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.css',
  imports: [CardModule, CurrencyPipe, ButtonModule, DialogModule, DataViewModule, DatePipe],
})
export class OrderModal implements OnInit {
  order: ClientOrder | null = null;
  isAdminOrderPage: boolean = false;
  orderUpdated = model<ClientOrder | null>(null);
  orderStatus = OrderStatus;
  orderStatusLabel = OrderStatusLabel;
  authService = inject(AuthService);
  orderService = inject(OrderService);
  

  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {}

  ngOnInit() {
    this.order = this.config.data?.order ?? null;
    this.isAdminOrderPage = this.config.data?.isAdminOrderPage ?? false;
  }

  validate() {
    this.orderService.updateOrderStatus(this.order?.id ?? 0, OrderStatus.Validated).subscribe(
      (updatedOrder: ClientOrder | null) => {
        this.ref.close(updatedOrder);
      }
    );
  }

  refuse() {
    this.orderService.updateOrderStatus(this.order?.id ?? 0, OrderStatus.Rejected).subscribe(
      (updatedOrder: ClientOrder | null) => {
        this.ref.close(updatedOrder);
      }
    );
  }
}
