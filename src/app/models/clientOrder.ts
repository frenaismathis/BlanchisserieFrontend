import { ClientOrderArticle } from "./clientOrderArticle";

export interface ClientOrder {
  id?: number;
  userId: number;
  totalPrice: number;
  status?: string;
  motif?: string;
  commentary?: string;
  clientOrderArticles: ClientOrderArticle[];
}
