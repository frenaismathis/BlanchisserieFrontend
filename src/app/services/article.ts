import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private http = inject(HttpClient);

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>('http://localhost:5150/api/articles');
  }
}
