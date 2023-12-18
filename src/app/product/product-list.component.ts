import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {Order, User} from '../_models';
import { ProductService } from '../_services';
import { Product } from '../_models';
import {HttpClient} from '@angular/common/http';
import {CurrencyPipe, UpperCasePipe} from '@angular/common';


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
    dtOptions: DataTables.Settings = {};
    private f = 0;

    constructor(
        private http: HttpClient,
        private pipeInstance: UpperCasePipe,
        private pipeCurrencyInstance: CurrencyPipe,
        private productService: ProductService,
        private router: Router) { }

    ngOnInit() {
      this.loadAll({ page: 1 });
    }

    gotoDetail(id: number) {
      this.router.navigate(['/product-detail', id]);
    }

    private loadAll({page}: { page: any }) {
        const loadAll = this.productService.getProducts(page);
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                loadAll.subscribe(
                (products: Product) => {
                    callback({
                        recordsTotal: products.count,
                        data: products.results             // <-- see here
                    });
                });
            },
            columns: [{
                title: 'ID',
                data: 'id'
            }, {
                title: 'Name',
                data: 'name'
            }, {
                title: 'Brand',
                data: 'brand'
            }, {
                title: 'Items',
                data: 'items'
            }, {
                title: 'Category',
                data: 'category.name'
            }, {
                title: 'Price',
                data: 'price'
            }],
            // tslint:disable-next-line:ban-types
            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                $('td', row).off('click');
                $('td', row).on('click', () => {
                  const product = JSON.parse(JSON.stringify(data));
                  // this.gotoDetail(order.id)
                });
                return row;
            }
        };
    }
}
