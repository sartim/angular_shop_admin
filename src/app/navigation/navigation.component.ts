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

    loggedUser!: User;


    constructor(private orderService: OrderService) {
        // @ts-ignore
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            console.log(this.currentUser.user.username);
        }
    }
    ngOnInit() {
        this.loadAllActive(0); // To get total orders
    }

    private loadAllActive(offset: any) {
        const loadAll = this.orderService.getAllOrders(offset);
        loadAll.subscribe((orders: Order[]) => { this.orders = orders; });
    }
}
