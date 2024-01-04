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
        .table-card {
          overflow:auto;
          padding: 0px;
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
    startEntry = 0;
    endEntry = 0;
    totalEntries = 0;
    entryPoint = 1;
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
        this.startEntry = this.entryPoint;
        this.endEntry = 20;
        this.entryPoint = this.entryPoint + 20;
        this.loadAll(1, this.startEntry, this.endEntry);
        // tslint:disable-next-line:no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }

    ngAfterViewInit(): void {
        //
    }

    gotoDetail(id: number) {
      this.router.navigate(['/product-detail', id]);
    }

    pageClick(url: string, isNext: boolean): void {
        this.navigation = false;
        const page = Number(this.helpers.getParameterByName('page', url));

        if (isNext) {
            this.startEntry = this.entryPoint;
            this.endEntry = this.entryPoint + 20;
            this.entryPoint = this.entryPoint + 20;
        } else {
            this.startEntry = this.startEntry - 20;
            this.endEntry = this.entryPoint - 20;
            this.entryPoint = this.entryPoint - 20;
            if (this.startEntry === 1) {
                this.endEntry = this.endEntry - 1;
            }
        }

        if (page != null) {
            if(page !== 0) {
                this.loadAll(page, this.startEntry, this.endEntry);
            }
        }
    }

    private loadAll(page: number, startEntry: number, endEntry: number) {
        this.products = new Product();
        this.loading = true;
        this.previous = false;
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
                this.startEntry = startEntry;
                this.endEntry = endEntry;
                this.totalEntries = this.products.count;
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
