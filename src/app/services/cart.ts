import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../models/article';
import { ClientOrderArticle } from '../models/client-order-article';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private readonly STORAGE_KEY = 'clientOrderArticles';
  private _clientOrderArticles = signal<ClientOrderArticle[]>(this.loadCart());
  currentClientOrderArticles = this._clientOrderArticles.asReadonly();
  
  private _totalPrice = 0;

  private saveCart() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._clientOrderArticles()));
  }

  private loadCart(): ClientOrderArticle[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  clearCart() {
    this._clientOrderArticles.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
    this._totalPrice = 0;
  }

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
        this.saveCart();
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
    const idx = clientOrderArticles.findIndex(
      clientOrderArticle => clientOrderArticle.articleId === articleId
    );
    if (idx !== -1) {
      clientOrderArticles.splice(idx, 1);
      this._clientOrderArticles.set(clientOrderArticles);
      this.saveCart();
    }
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
    this.saveCart();
  }

  getTotalPrice(): number {
    this._totalPrice = this._clientOrderArticles().reduce((total, clientOrderArticle) => {
      return total + (clientOrderArticle.article.price * clientOrderArticle.quantity);
    }, 0);
    return this._totalPrice;
  }
}
