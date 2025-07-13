import { Article } from "./article";

export interface ClientOrderArticle {
  clientOrderId: number;
  articleId: number;
  quantity: number;
  article: Article;
}
