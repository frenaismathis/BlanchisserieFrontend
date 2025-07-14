import { ClientOrderArticle } from "./client-order-article";

export interface ClientOrder {
  id?: number;
  userId: number;
  username: string;
  totalPrice: number;
  status: number;
  motif?: string;
  commentary?: string;
  clientOrderArticles: ClientOrderArticle[];
}
