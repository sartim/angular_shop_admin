import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user.service';
import { User } from '../_models/index';

@Injectable()
export class OrderService {
    constructor(private http: Http, private userService: UserService, ) { }

    getOrdersToday() {
        return this.http.get('http://127.0.0.1:8000/api/v1/order/today/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    getOrdersThisMonth() {
        return this.http.get('http://127.0.0.1:8000/api/v1/order/this-month/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    getOrdersLastMonth() {
        return this.http.get('http://127.0.0.1:8000/api/v1/order/last-month/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    getOrdersPlot() {
        return this.http.get('http://127.0.0.1:8000/api/v1/order/plot/',
          this.userService.jwt()).map((response: Response) => response.json());
    }

    getAllOrders(offset: number) {
        return this.http.get('http://127.0.0.1:8000/api/v1/order/' + '?offset=' + offset,
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getOrderById(id: number) {
        return this.http.get('http://127.0.0.1:8000/api/v1/order/' + id + '/',
          this.userService.jwt()).map((response: Response) => response.json());
    }
}
