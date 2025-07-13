export interface ClientOrder {
  id: number;
  userId: number;
  clientOrderArticles: {
    clientOrderId: number;
    articleId: number;
    quantity: number;
  }[];
  totalPrice: number;
  status: string;
}
