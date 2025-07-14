import { Component, input, Input, InputSignal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ClientOrder } from '../../models/client-order';
import { OrderStatus } from '../../models/order-status';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrderModal } from '../order-modal/order-modal';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  templateUrl: './list-orders.html',
  styleUrl: './list-orders.css',
  imports: [TableModule, CurrencyPipe, ButtonModule],
  providers: [DialogService]
})
export class ListOrders {
  orders: InputSignal<ClientOrder[]> = input<ClientOrder[]>([]);
  loading: InputSignal<boolean> = input<boolean>(false);
  
  orderStatus = OrderStatus;
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) { }

  openOrderDialog(order: ClientOrder) {
    this.ref = this.dialogService.open(OrderModal, {
      closable: true,
      data: { order },
      header: 'Détails de la commande',
      width: '50vw',
      modal: true,
      dismissableMask: true
    })
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
