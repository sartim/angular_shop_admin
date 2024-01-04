import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../_services/index';
import { ProductDetail } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'product-detail.component.html',
    styles: [`
        .form-label {
            margin-left: 10px;
        }
    `]
})
export class ProductDetailComponent implements OnInit {
    product: ProductDetail | undefined;

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
