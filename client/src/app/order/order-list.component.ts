import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { OrderService } from '../_services/index';
import { Order } from '../_models/index';


@Component({
    moduleId: module.id,
    templateUrl: 'order-list.component.html',
    styles: [`
        td {
            white-space: nowrap;
        }
    `]
})
export class OrderListComponent implements OnInit {
    orders: Order;
    users: User[] = [];

    selectedOrder: Order;

    loggedUser: User;

    private f = 0;

    constructor(
        private orderService: OrderService,
        private router: Router) { }

    ngOnInit() {
      this.loadAllDelivered(0);
    }

    gotoDetail(id: number) {
      this.router.navigate(['/order-detail', id]);
    }

    pageOffset() {
      const inc_offset = this.f += 20;
      this.loadAllDelivered(inc_offset);
    }

    private loadAllDelivered(offset) {
      const load_all_ = this.orderService.getAllOrders(offset);
      load_all_.subscribe(orders => { this.orders = orders; });
    }
}
