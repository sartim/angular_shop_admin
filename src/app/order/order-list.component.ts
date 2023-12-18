import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models';
import { OrderService } from '../_services';
import { Order } from '../_models';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { UpperCasePipe, CurrencyPipe } from '@angular/common'
import {HttpClient} from '@angular/common/http';

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
    dtOptions: DataTables.Settings = {};
    private f = 0;

    constructor(
        private http: HttpClient,
        private pipeInstance: UpperCasePipe,
        private pipeCurrencyInstance: CurrencyPipe,
        private orderService: OrderService,
        private router: Router) { }

    ngOnInit() {
      this.loadAll({page: 1});
    }

    gotoDetail(id: number) {
      this.router.navigate(['/order-detail', id]);
    }

    private loadAll({page}: { page: any }) {
        const loadAll = this.orderService.getAllOrders(page);
        this.dtOptions = {
            ajax: (dataTablesParameters: any, callback) => {
                loadAll.subscribe(
                (orders: Order) => {
                    callback({
                        recordsTotal: orders.count,
                        data: orders.results             // <-- see here
                    });
                });
            },
            columns: [{
                title: 'ID',
                data: 'id'
            }, {
                title: 'Order Total',
                data: 'order_total'
            }, {
                title: 'First Name',
                data: 'user.first_name'
            }, {
                title: 'Last Name',
                data: 'user.last_name'
            }],
            // tslint:disable-next-line:ban-types
            rowCallback: (row: Node, data: any[] | Object, index: number) => {
                const self = this;
                $('td', row).off('click');
                $('td', row).on('click', () => {
                  const order = JSON.parse(JSON.stringify(data));
                  this.gotoDetail(order.id)
                });
                return row;
            }
        };
        loadAll.subscribe((orders: Order) => { this.orders = orders;});
    }
}
