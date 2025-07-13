import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ClientOrder } from '../../models/clientOrder';

@Component({
  selector: 'app-my-orders',
  imports: [TableModule, CurrencyPipe],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {
  orders: ClientOrder[] = [];
  loading = true;

  ngOnInit() {
    // Remplace par un vrai service de récupération des commandes utilisateur
    // Ici, on suppose que l'utilisateur est déjà authentifié
    // TODO: Remplacer par un appel à OrderService
    this.loading = false;
    // Exemple de données mock
    /*this.orders = [
      {
        id: 1,
        userId: 1,
        clientOrderArticles: [
          { clientOrderId: 1, articleId: 2, quantity: 3 },
          { clientOrderId: 1, articleId: 5, quantity: 1 },
        ],
        totalPrice: 40,
        status: 'En cours',
      },
      {
        id: 2,
        userId: 1,
        clientOrderArticles: [{ clientOrderId: 2, articleId: 1, quantity: 2 }],
        totalPrice: 20,
        status: 'Validée',
      },
    ];*/
  }
}
