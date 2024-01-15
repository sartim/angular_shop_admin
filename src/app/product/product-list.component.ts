import {ActivatedRoute, Router} from '@angular/router';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {User} from '../_models';
import {AlertService, AuthenticationService, ProductService} from '../_services';
import { Product } from '../_models';
import {HttpClient} from '@angular/common/http';
import {CurrencyPipe, UpperCasePipe} from '@angular/common';
import {ScriptHelper} from '../_helpers/scripts.helpers';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    moduleId: module.id,
    templateUrl: 'product-list.component.html',
    styles: [`
        .table-card {
          overflow:auto;
          padding: 0;
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
    pages!: SafeHtml;
    private f = 0;

    constructor(
        private sanitizer: DomSanitizer,
        private elementRef: ElementRef,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private pipeInstance: UpperCasePipe,
        private pipeCurrencyInstance: CurrencyPipe,
        private productService: ProductService,
        private helpers: ScriptHelper,
        private renderer: Renderer2,
        private router: Router) {
            this.products = new Product();
    }

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
        this.loading = true;
        this.previous = false;
        this.navigation = false;
        this.products = new Product();
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
                let str = '';
                const totalPages = Math.ceil(this.totalEntries / 20);
                const pagesToShow = 5;
                const halfPagesToShow = Math.floor(pagesToShow / 2);
                let startPage = Math.max(1, page - halfPagesToShow);
                const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
                if (endPage - startPage + 1 < pagesToShow) {
                  startPage = Math.max(1, endPage - pagesToShow + 1);
                }
                for (let i = startPage; i <= endPage; i++) {
                  if (page === i) {
                    str += '<li class="active waves-effect"><a class="current_page">' + i + '</a></li>';
                  } else {
                    str += '<li class="waves-effect"><a class="current_page">' + i + '</a></li>';
                  }
                }
                this.pages = this.sanitizer.bypassSecurityTrustHtml(str);
            },
            (error) => {
                this.loading = false;
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
            });
    }

    gotoPage(event: Event, startEntry: number, endEntry: number): void {
        const clickedElement = event.target as HTMLElement;
        if (clickedElement.classList.contains('current_page')) {
          const pageNumber = +clickedElement.innerText;
          this.loadAll(pageNumber, startEntry, endEntry)
        }
    }

    ngOnDestroy(): void {
        //
    }
}
