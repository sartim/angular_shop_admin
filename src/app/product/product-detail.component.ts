import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location } from '@angular/common';

import {ProductService} from '../_services/index';
import {OrderDetail, ProductDetail} from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';
import { switchMap } from 'rxjs/operators';

@Component({
    moduleId: module.id,
    templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    product: ProductDetail;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private location: Location) {
        this.product = new ProductDetail();
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const idFromRoute = String(routeParams.get('id'));
        this.productService.getProductById(idFromRoute).subscribe((product: ProductDetail) => this.product = product);
    }

    private getDel(id: any) {
      this.productService.getProductById(id).subscribe((product: ProductDetail) => this.product = product);
    }

    goBack(): void {
        this.location.back();
    }
}
