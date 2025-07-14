import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClientOrder } from '../models/client-order';
import { AuthService } from './auth';
import { CartService } from './cart';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
    private http = inject(HttpClient);
    private authService = inject(AuthService);
    private cartService = inject(CartService);
    
    createClientOrder(motif: string | undefined, commentary: string | undefined) {
        const connectedUser = this.authService.currentUser();
        if (!connectedUser) {
            throw new Error('User not connected');
        }
        const clientOrder: ClientOrder = {
            userId: connectedUser.id,
            username: connectedUser.username,
            status: 0,
            clientOrderArticles: this.cartService.currentClientOrderArticles(),
            totalPrice: this.cartService.getTotalPrice(),
            motif: motif,
            commentary: commentary
        };
        return this.http.post('http://localhost:5150/api/clientOrders', clientOrder);
    }

    getClientOrdersByUserId(userId: number) {
        return this.http.get<ClientOrder[]>(`http://localhost:5150/api/clientOrders/user/${userId}`);
    }

    getClientOrders() {
        return this.http.get<ClientOrder[]>(`http://localhost:5150/api/clientOrders`);
    }
}
