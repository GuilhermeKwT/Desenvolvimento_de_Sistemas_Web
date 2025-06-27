import { Injectable } from '@angular/core';
import { Variables } from '../config/variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Order from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private apiURL : string = Variables.apiUrl;

  constructor(private http: HttpClient, private authService : AuthService) { }

  private getAuthHeaders() : HttpHeaders{
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllOrders() : Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiURL}/orders`, {headers: this.getAuthHeaders()});
  }

  getOrderById(id: string) : Observable<Order>{
    return this.http.get<Order>(`${this.apiURL}/orders/${id}`, {headers: this.getAuthHeaders()});
  }

  createOrder(order: Order) : Observable<Order>{
    return this.http.post<Order>(`${this.apiURL}/orders`, order, {headers: this.getAuthHeaders()});
  }
}
