import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {Order, User} from '../_models';
import {AlertService, AuthenticationService, OrderService} from '../_services';
import { UpperCasePipe, CurrencyPipe } from '@angular/common'
import {HttpClient} from '@angular/common/http';
import {ScriptHelper} from '../_helpers/scripts.helpers';

@Component({
    moduleId: module.id,
    templateUrl: 'order-list.component.html',
    styles: [`
        td {
            white-space: nowrap;
        }
    `]
})
export class OrderListComponent implements OnInit {
    orders!: Order;
    users: User[] = [];
    selectedOrder!: Order;
    loggedUser!: User;
    loading = false;
    navigation = false;
    previous = false;
    next = false;
    startEntry = 0;
    endEntry = 0;
    totalEntries = 0;
    entryPoint = 1;
    dtOptions: DataTables.Settings = {};
    private f = 0;

    constructor(
        private alertService: AlertService,
        private authService: AuthenticationService,
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
      this.router.navigate(['/order-detail', id]);
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
        this.orders = new Order();
        this.loading = true;
        this.previous = false;
        const loadAll = this.orderService.getAllOrders(page);
        loadAll.subscribe((orders: Order) => {
                this.orders = orders;
                const previousPage = Number(this.helpers.getParameterByName('page', this.orders.previous));
                const nextPage = Number(this.helpers.getParameterByName('page', this.orders.next));
                if(previousPage !== 0) {
                    this.previous = true;
                } else if(nextPage !== 0) {
                    this.next = true;
                }
                this.startEntry = startEntry;
                this.endEntry = endEntry;
                this.totalEntries = this.orders.count;
                this.loading = false;
                this.navigation = true;
            },
            (error) => {
                this.loading = false;
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authService.logout();
                }
            });
    }
}
