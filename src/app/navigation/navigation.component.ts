import { Component, OnInit } from '@angular/core';

import {User, UserDetail} from '../_models';
import { Order } from '../_models';
import { OrderService } from '../_services';


@Component({
    moduleId: module.id,
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html',
    styles: [`
        .sidenav {
          height: 100%;
          width: 0;
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          background-color: #FFFFFF;
          overflow-x: hidden;
          transition: 0.5s;
          padding-top: 60px;
        }
        .sidenav a {
          padding: 8px 8px 8px 32px;
          text-decoration: none;
          font-size: 25px;
          color: #818181;
          display: block;
          transition: 0.3s;
        }
        .sidenav a:hover {
          color: #f1f1f1;
        }
        .sidenav .closebtn {
          position: absolute;
          top: 0;
          right: 25px;
          font-size: 36px;
          margin-left: 50px;
        }
        @media screen and (max-height: 450px) {
          .sidenav {padding-top: 15px;}
          .sidenav a {font-size: 18px;}
        }
        @media only screen and (min-width: 1026px) {
            .sidenav {
                display: none;
            }
        }
        .mob-nav-text {
            font-size: small;
        }
        #mob-nav {
            margin-top: -10px;
            font-size: small;
        }
    `]
})
export class NavigationComponent implements OnInit {
    orders!: Order;
    currentUser!: UserDetail;
    users: User[] = [];
    loggedUser!: User;


    constructor(private orderService: OrderService) {}
    ngOnInit() {
        // @ts-ignore
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
}
