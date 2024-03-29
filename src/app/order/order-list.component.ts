import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Order, User} from '../_models';
import {AlertService, AuthenticationService, OrderService} from '../_services';
import { UpperCasePipe, CurrencyPipe } from '@angular/common'
import {HttpClient} from '@angular/common/http';
import {ScriptHelper} from '../_helpers/scripts.helpers';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    templateUrl: 'order-list.component.html',
    styles: [`
        .table-card {
          overflow:auto;
          padding: 0;
        }
    `]
})
export class OrderListComponent implements OnInit {
    orders!: Order;
    users: User[] = [];
    loggedUser!: User;
    loading = false;
    isPaginationHidden = true;
    previous = false;
    next = false;
    startEntry = 0;
    endEntry = 0;
    totalEntries = 0;
    entryPoint = 1;
    pageSelector!: string;
    pages!: SafeHtml;

    constructor(
        private sanitizer: DomSanitizer,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private http: HttpClient,
        private pipeInstance: UpperCasePipe,
        private pipeCurrencyInstance: CurrencyPipe,
        private orderService: OrderService,
        private helpers: ScriptHelper,
        private router: Router) { }

    ngOnInit() {
        this.helpers.initScript();
        this.startEntry = this.entryPoint;
        this.endEntry = 20;
        this.entryPoint = this.entryPoint + 20;
        this.loadAll(1, this.startEntry, this.endEntry);
    }

    gotoDetail(id: number) {
      this.router.navigate(['/order/detail', id]);
    }

    pageClick(url: string, isNext: boolean): void {
        this.isPaginationHidden = true;
        const page = Number(this.helpers.getParameterByName('page', url));
        const entry = this.helpers.handlePageEntry(isNext)
        if (page != null) {
            if(page !== 0) {
                this.loadAll(page, entry.startEntry, entry.endEntry);
            }
        }
    }

    gotoPage(event: Event, startEntry: number, endEntry: number): void {
        const clickedElement = event.target as HTMLElement;
        if (clickedElement.classList.contains('current_page')) {
          const pageNumber = +clickedElement.innerText;
          this.loadAll(pageNumber, startEntry, endEntry)
        }
    }

    private loadAll(page: number, startEntry: number, endEntry: number) {
        this.orders = new Order();
        this.loading = true;
        this.previous = false;
        this.isPaginationHidden = true;
        const loadAll = this.orderService.getAll(page);
        loadAll.subscribe((orders: Order) => {
                this.orders = orders;
                this.loading = false;
                this.isPaginationHidden = false;
                const recordCount = this.orders.count;
                const previousPageUrl = this.orders.previous;
                const nextPageUrl = this.orders.next;
                const pageData = this.helpers.handlePageClick(page, recordCount, previousPageUrl, nextPageUrl, startEntry, endEntry)
                this.previous = pageData.previous;
                this.next = pageData.next;
                this.pageSelector = ''; // disabled
                this.pages = this.sanitizer.bypassSecurityTrustHtml(pageData.innerHTML);
            },
            (error) => {
                this.loading = false;
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
            });
    }
}
