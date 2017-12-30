import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { Order } from '../_models/index';
import { OrderService } from '../_services/index';


@Component({
    moduleId: module.id,
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html'
})
export class NavigationComponent implements OnInit {
    orders: Order[] = [];
    currentUser: User;
    users: User[] = [];

    loggedUser: User;


    constructor(private orderService: OrderService) {
        // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
        if (this.loggedUser) {
            console.log(this.loggedUser);
        } else {
            // location.reload();
        }
    }
    ngOnInit() {
        this.loadAllActive(0); // To get total orders
    }

    private loadAllActive(offset) {
        const load_all_ = this.orderService.getAllOrders(offset);
        load_all_.subscribe(orders => { this.orders = orders; });
    }
}
