import {ActivatedRoute, Router} from '@angular/router';
import {AfterViewInit, Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
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
export class ProductListComponent implements AfterViewInit, OnInit, OnDestroy {
    products!: Product;
    users: User[] = [];
    selectedOrder!: Product;
    loggedUser!: User;
    dtOptions: DataTables.Settings = {};
    returnUrl!: string;
    loading = false;
    navigation = false;
    previous = false;
    next = false;
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
        this.loadAll(1);
        // tslint:disable-next-line:no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }

    ngAfterViewInit(): void {
        //
    }

    gotoDetail(id: number) {
      this.router.navigate(['/product-detail', id]);
    }

    pageClick(url: string): void {
        this.navigation = false;
        const page = Number(this.helpers.getParameterByName('page', url));
        console.log(page);
        if (page != null) {
            if(page !== 0) {
                this.loadAll(page);
            }
        }
    }

    private loadAll(page: number) {
        this.products = new Product();
        this.loading = true;
        const loadAll = this.productService.getProducts(page);
        loadAll.subscribe((products: Product) => {
                this.products = products;
                const previousPage = Number(this.helpers.getParameterByName('page', this.products.previous));
                const nextPage = Number(this.helpers.getParameterByName('page', this.products.next));
                if(previousPage !== 0) {
                    this.previous = true;
                } else if(nextPage !== 0) {
                    this.next = true;
                }
                this.loading = false;
                this.navigation = true;
            },
            (error: string) => {
                this.loading = false;
            });
    }

    ngOnDestroy(): void {
        //
    }
}
