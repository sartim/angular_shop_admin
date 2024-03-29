import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { AlertService, AuthenticationService, ProductService } from '../_services';
import { ProductDetail } from '../_models';

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
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private productService: ProductService,
        private route: ActivatedRoute,
        private location: Location) {
        this.product = new ProductDetail();
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const idFromRoute = String(routeParams.get('id'));
        this.productService.getById(idFromRoute).subscribe(
            (product: ProductDetail) => {this.product = product},
            (error) => {
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
            });
    }

    private getDel(id: any) {
      this.productService.getById(id).subscribe(
          (product: ProductDetail) => {this.product = product},
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
