import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.css'
})
export class OrderModal {
  @Input() order: any;
  // À compléter : affichage des détails de la commande
}
