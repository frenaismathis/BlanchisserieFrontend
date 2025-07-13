import { Component, inject, OnInit, signal } from '@angular/core';
import { ArticleService } from '../../services/article';
import { Article } from '../../models/article';
import { CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart';
import { ClientOrderArticle } from '../../models/clientOrderArticle';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
  standalone: true,
  imports: [CurrencyPipe, CardModule, ButtonModule],
})
export class Catalog implements OnInit {
  private cartService = inject(CartService);
  private articleService = inject(ArticleService);

  private _articles = signal<Article[]>([]);
  articles = this._articles.asReadonly();

  loading = true;

  readonly clientOrderArticles = this.cartService.currentClientOrderArticles;

  ngOnInit() {
    this.articleService.getArticles().subscribe({
      next: (data) => {
        this._articles.set(data);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  increment(article: Article) {
    this.cartService.increment(article);
  }

  decrement(article: Article) {
    this.cartService.decrement(article);
  }

  getClientOrderArticleFromArticleId(articleId: number): ClientOrderArticle | null {
    const articlesMap = new Map<number, ClientOrderArticle>(
      this.clientOrderArticles().map(clientOrderArticle => [clientOrderArticle.articleId, clientOrderArticle])
    );
    return articlesMap.get(articleId) ?? null;
  }
}
