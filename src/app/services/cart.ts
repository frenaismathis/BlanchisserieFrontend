import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../models/article';
import { ClientOrderArticle } from '../models/clientOrderArticle';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private _clientOrderArticles = signal<ClientOrderArticle[]>([]);
  currentClientOrderArticles = this._clientOrderArticles.asReadonly();

  increment(article: Article) {
    this.updateQuantity(article, 1);
  }

  decrement(article: Article) {
    this.updateQuantity(article, -1);
  }

  private updateQuantity(article: Article, delta: number) {
    const clientOrderArticles = this._clientOrderArticles();
    
    const idx = clientOrderArticles.findIndex(
      clientOrderArticle => clientOrderArticle.articleId === article.id
    );

    if (idx !== -1) {

      const newQuantity = clientOrderArticles[idx].quantity + delta;

      if (newQuantity > 0) {
        clientOrderArticles[idx] = {
          ...clientOrderArticles[idx],
          quantity: newQuantity,
        };
        this._clientOrderArticles.set(clientOrderArticles);
      } else {
        this.deleteArticle(article.id);
      }

    } else if (delta > 0) {
      this.addArticle(article);
    }
    console.log(this._clientOrderArticles());
  }

  deleteArticle(articleId: number) {
    let clientOrderArticles = this._clientOrderArticles();

    const idx = this._clientOrderArticles().findIndex(
      clientOrderArticle => clientOrderArticle.articleId === articleId
    );

    clientOrderArticles.splice(idx, 1);

    this._clientOrderArticles.set(clientOrderArticles);
  }

  addArticle(article: Article) {
    const clientOrderArticles = this._clientOrderArticles();

    clientOrderArticles.push({
      clientOrderId: 0,
      articleId: article.id,
      quantity: 1,
      article,
    });

    this._clientOrderArticles.set(clientOrderArticles);
  }
}
