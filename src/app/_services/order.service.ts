import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../_models/index';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OrderService {
    constructor(private http: HttpClient, private userService: UserService, ) { }

    getOrdersToday() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/order/today/', this.userService.jwt()).map((response: Response) => response.json());
    }

    getOrdersThisMonth() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/order/this-month/', this.userService.jwt()).map((response: Response) => response.json());
    }

    getOrdersLastMonth() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/order/last-month/', this.userService.jwt()).map((response: Response) => response.json());
    }

    getOrdersPlot() {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/order/plot/', this.userService.jwt()).map((response: Response) => response.json());
    }

    getAllOrders(offset: number) {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/order/' + '?offset=' + offset, this.userService.jwt()).map((response: Response) => response.json());
    }

    getOrderById(id: string | null) {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/order/' + id + '/', this.userService.jwt()).map((response: Response) => response.json());
    }
}
