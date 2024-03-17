import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { Order, OrderDetail } from '../_models';
import apiUrl from '../config/api';

@Injectable()
export class OrderService extends BaseService<Order, OrderDetail> {
  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService, 'api/v1/orders');
  }

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
}
