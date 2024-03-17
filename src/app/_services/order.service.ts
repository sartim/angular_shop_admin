import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { Order, OrderDetail } from '../_models';

@Injectable()
export class OrderService extends BaseService<Order, OrderDetail> {
  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService, 'api/v1/orders');
  }

  getOrdersToday(url: string) {
      // @ts-ignore
      return this.http.get<Order>(url, this.authService.jwt());
  }

  getOrdersThisMonth(url: string) {
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      return this.http.get<Order>(url, this.authService.jwt());
  }

  getOrdersLastMonth(url: string) {
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      return this.http.get<Order>(url, this.authService.jwt());
  }

  getOrdersPlot(url: string) {
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      return this.http.get<Order>(url, this.authService.jwt());
  }
}
