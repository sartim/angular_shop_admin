import {ActivatedRoute, Router} from '@angular/router';
import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {Order, User} from '../_models';
import {AuthenticationService, ProductService} from '../_services';
import { Product } from '../_models';
import {HttpClient} from '@angular/common/http';
import {CurrencyPipe, UpperCasePipe} from '@angular/common';
import {ScriptHelper} from '../_helpers/scripts.helpers';


@Component({
    moduleId: module.id,
    templateUrl: 'product-list.component.html',
    styles: [`
        td {
            white-space: nowrap;
        }
    `]
})
export class ProductListComponent implements AfterViewInit, OnInit {
    products!: Product;
    users: User[] = [];
    selectedOrder!: Product;
    loggedUser!: User;
    dtOptions: DataTables.Settings = {};
    returnUrl!: string;
    private f = 0;

    constructor(
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private pipeInstance: UpperCasePipe,
        private pipeCurrencyInstance: CurrencyPipe,
        private productService: ProductService,
        private helpers: ScriptHelper,
        private renderer: Renderer2,
        private router: Router) { }

    ngOnInit() {
        this.helpers.initScript();
        this.loadAll({ page: 1 });
        // tslint:disable-next-line:no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }

    ngAfterViewInit(): void {
        this.renderer.listen('document', 'click', (event) => {
          if (event.target.hasAttribute('id')) {
            this.router.navigate(['/product-detail/' + event.target.id]);
          }
        });
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
                    },
                    (error: string) => {
                        const err = JSON.parse(JSON.stringify(error));
                        if (err.status === 401 ) {
                            this.router.navigate([this.returnUrl]);
                        }
                    }
                );
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
            }, {
                title: 'Action',
                render (data: any, type: any, full: any) {
                  return '<button id="'+full.id+'" class="btn darken-1 waves-effect waves-orange">View</button>';
                }
              }],
            // tslint:disable-next-line:ban-types
            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                $('td', row).off('click');
                $('td', row).on('click', () => {
                  const product = JSON.parse(JSON.stringify(data));
                  this.gotoDetail(product.id)
                });
                return row;
            }
        };
    }
}
