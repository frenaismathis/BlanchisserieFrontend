import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CartService } from '../../services/cart';
import { CurrencyPipe } from '@angular/common';
import { Article } from '../../models/article';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  standalone: true,
  imports: [CardModule, ButtonModule, CurrencyPipe],
})
export class Cart{

  private cartService = inject(CartService);

  readonly clientOrderArticles = this.cartService.currentClientOrderArticles;

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
