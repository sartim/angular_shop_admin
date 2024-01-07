import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location } from '@angular/common';

import { OrderService } from '../_services/index';
import {Order, OrderDetail} from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { switchMap } from 'rxjs/operators';

@Component({
    moduleId: module.id,
    templateUrl: 'order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
    order: OrderDetail;

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private orderService: OrderService,
        private route: ActivatedRoute,
        private location: Location) {
        this.order = new OrderDetail();
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const idFromRoute = Number(routeParams.get('id'));
        this.orderService.getOrderById(idFromRoute).subscribe(
            (order: OrderDetail) => {this.order = order},
            (error) => {
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
            });
    }

    private getDel(id: any) {
      this.orderService.getOrderById(id).subscribe(
          (order: OrderDetail) => {this.order = order},
          (error) => {
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
          });
    }

    goBack(): void {
        this.location.back();
    }
}
