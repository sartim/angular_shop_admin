import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location } from '@angular/common';

import { OrderService } from '../_services/index';
import { OrderDetail } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { switchMap } from 'rxjs/operators';

@Component({
    moduleId: module.id,
    templateUrl: 'order-detail.component.html'
})
export class OrderDetailComponent implements OnInit {
    order: OrderDetail;

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private location: Location) {
        this.order = new OrderDetail();
    }

    ngOnInit() {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.orderService.getOrderById(params.get('id'))))
            .subscribe((order: OrderDetail) => {
                this.order = order;
            });
        // subscribe to router event
      // this.route.params.subscribe((params: Params) => {
      //     let id = params['id'];
      //     console.log(id);
      //     this.getDel(id);
      //   });
    }

    private getDel(id: any) {
      this.orderService.getOrderById(id).subscribe((order: OrderDetail) => this.order = order);
    }

    goBack(): void {
        this.location.back();
    }
}
