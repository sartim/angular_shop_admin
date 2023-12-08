import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {HttpClient} from '@angular/common/http';
import {Order, OrderDetail} from '../_models';
// @ts-ignore
import apiUrl from '../config/api.js';

@Injectable()
export class OrderService {
    constructor(private http: HttpClient, private userService: UserService, ) { }

    getOrdersToday() {
        // @ts-ignore
        return this.http.get<Order>(apiUrl + '/api/v1/orders/today', this.userService.jwt());
    }

    getOrdersThisMonth() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get<Order>(apiUrl + '/api/v1/orders', this.userService.jwt());
    }

    getOrdersLastMonth() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get<Order>(apiUrl + '/api/v1/orders', this.userService.jwt());
    }

    getOrdersPlot() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get<Order>(apiUrl + '/api/v1/orders', this.userService.jwt());
    }

    getAllOrders(offset: number) {
        // @ts-ignore
        return this.http.get<Order>(apiUrl + '/api/v1/orders' + '?page=' + offset, this.userService.jwt());
    }

    getOrderById(id: string | null) {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get<OrderDetail>(apiUrl + apiUrl + '/api/v1/orders/' + id, this.userService.jwt());
    }
}
