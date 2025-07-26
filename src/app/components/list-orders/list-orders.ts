import { Component, Signal, WritableSignal } from '@angular/core';
import { Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ClientOrder } from '../../models/client-order';
import { OrderStatus } from '../../models/order-status';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderModal } from '../order-modal/order-modal';
import { OrderStatusLabel } from '../../models/order-status-label';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  templateUrl: './list-orders.html',
  styleUrl: './list-orders.css',
  imports: [TableModule, CurrencyPipe, ButtonModule, DatePipe],
  providers: [DialogService]
})
export class ListOrders {
  @Input() orders!: Signal<ClientOrder[]>;
  @Input() orderUpdated!: WritableSignal<ClientOrder | null>;
  @Input() loading!: Signal<boolean>;
  @Input() isAdminOrderPage!: Signal<boolean>;
  orderStatus = OrderStatus;
  orderStatusLabel = OrderStatusLabel;
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {
  }

  openOrderDialog(order: ClientOrder) {
    this.ref = this.dialogService.open(OrderModal, {
      closable: true,
      data: { order, isAdminOrderPage: this.isAdminOrderPage },
      header: 'Détails de la commande',
      width: '50vw',
      modal: true,
      dismissableMask: true
    });
    this.ref.onClose.subscribe((updatedOrder: ClientOrder | null) => {
      if (updatedOrder) {
        this.orderUpdated.set(updatedOrder);
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
