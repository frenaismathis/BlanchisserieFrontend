import { Component, inject, OnInit } from '@angular/core';
import { ClientOrder } from '../../models/client-order';
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { OrderStatus } from '../../models/order-status';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-order-modal',
  standalone: true,
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.css',
  imports: [CardModule, CurrencyPipe, ButtonModule, DialogModule, DataViewModule],
})
export class OrderModal implements OnInit {
  order: ClientOrder | null = null;
  orderStatus = OrderStatus;

  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {}

  ngOnInit() {
    this.order = this.config.data?.order ?? null;
  }

}
