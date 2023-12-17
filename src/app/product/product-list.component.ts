import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models';
import { ProductService } from '../_services';
import { Product } from '../_models';


@Component({
    moduleId: module.id,
    templateUrl: 'product-list.component.html',
    styles: [`
        td {
            white-space: nowrap;
        }
    `]
})
export class ProductListComponent implements OnInit {
    products!: Product;
    users: User[] = [];

    selectedOrder!: Product;

    loggedUser!: User;

    private f = 0;

    constructor(
        private productService: ProductService,
        private router: Router) { }

    ngOnInit() {
      this.loadAllDelivered({page: 0});
    }

    gotoDetail(id: number) {
      this.router.navigate(['/product-detail', id]);
    }

    pageOffset() {
      const incOffset = this.f += 20;
      this.loadAllDelivered({page: incOffset});
    }

    private loadAllDelivered({page}: { page: any }) {
      const loadAll = this.productService.getProducts(page);
      loadAll.subscribe((products: Product) => { this.products = products; });
    }
}
