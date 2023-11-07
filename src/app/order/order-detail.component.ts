import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location } from '@angular/common';

import { OrderService } from '../_services/index';
import { Order } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { switchMap } from 'rxjs/operators';

@Component({
    moduleId: module.id,
    templateUrl: 'order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
    orders: Order[] = [];

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.orderService.getOrderById(params.get('id'))))
            .subscribe((orders: Order[]) => this.orders = orders);
        // subscribe to router event
      // this.route.params.subscribe((params: Params) => {
      //     let id = params['id'];
      //     console.log(id);
      //     this.getDel(id);
      //   });
    }

    private getDel(id: any) {
      this.orderService.getOrderById(id).subscribe((orders: Order[]) => this.orders = orders);
    }

    goBack(): void {
        this.location.back();
    }
}
