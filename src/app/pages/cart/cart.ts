import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CartService } from '../../services/cart';
import { CurrencyPipe } from '@angular/common';
import { Article } from '../../models/article';
import { OrderService } from '../../services/order';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  standalone: true,
  imports: [
    CardModule, 
    ButtonModule, 
    CurrencyPipe, 
    InputTextModule,
    FloatLabelModule,
    FormsModule,
    DataViewModule 
  ]
})
export class Cart {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);

  readonly clientOrderArticles = this.cartService.currentClientOrderArticles;

  motif = undefined;
  commentary = undefined;

  get totalPrice() {
    return this.cartService.getTotalPrice();
  }

  createClientOrder() {
    this.orderService.createClientOrder(this.motif, this.commentary).subscribe(() => {
      this.cartService.clearCart();
    });
  }

  increment(article: Article) {
    this.cartService.increment(article);
  }

  decrement(article: Article) {
    this.cartService.decrement(article);
  }

  deleteArticle(articleId: number) {
    this.cartService.deleteArticle(articleId);
  }
}
