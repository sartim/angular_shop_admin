import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {HttpClient} from '@angular/common/http';
import {Order, OrderDetail} from '../_models';
// @ts-ignore
import apiUrl from '../config/api.js';

@Injectable()
export class OrderService {
    constructor(private http: HttpClient, private authService: AuthenticationService, ) { }

    getOrdersToday() {
        // @ts-ignore
        return this.http.get<Order>(apiUrl + '/api/v1/orders/today', this.authService.jwt());
    }

    getOrdersThisMonth() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get<Order>(apiUrl + '/api/v1/orders', this.authService.jwt());
    }

    getOrdersLastMonth() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get<Order>(apiUrl + '/api/v1/orders', this.authService.jwt());
    }

    getOrdersPlot() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get<Order>(apiUrl + '/api/v1/orders', this.authService.jwt());
    }

    getAllOrders(page: number) {
        // @ts-ignore
        return this.http.get<Order>(apiUrl + '/api/v1/orders' + '?page=' + page, this.authService.jwt());
    }

    getOrderById(id: number | null) {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get<OrderDetail>(apiUrl + '/api/v1/orders/' + id, this.authService.jwt());
    }
}
