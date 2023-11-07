import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models';
import { OrderService } from '../_services';
import { Order } from '../_models';


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
    orders!: Order;
    users: User[] = [];

    selectedOrder!: Order;

    loggedUser!: User;

    private f = 0;

    constructor(
        private orderService: OrderService,
        private router: Router) { }

    ngOnInit() {
      this.loadAllDelivered({offset: 0});
    }

    gotoDetail(id: number) {
      this.router.navigate(['/order-detail', id]);
    }

    pageOffset() {
      const incOffset = this.f += 20;
      this.loadAllDelivered({offset: incOffset});
    }

    private loadAllDelivered({offset}: { offset: any }) {
      const loadAll = this.orderService.getAllOrders(offset);
      loadAll.subscribe((orders: Order) => { this.orders = orders; });
    }
}
