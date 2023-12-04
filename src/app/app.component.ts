import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from './_services';
// @ts-ignore
import * as M from '../assets/admin-assets/js/materialize.min';
import * as io from 'socket.io-client';
// @ts-ignore
import apiUrl from './config/api.js';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    styles: [],
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    Collapsible: any;
    Dropdown: any;
    private url = apiUrl + '/notification';
    // @ts-ignore
    private socket;

    constructor(private authenticationService: AuthenticationService) {
        // @ts-ignore
        // this.socket = io(this.url);
    }

    ngOnInit() {
        // this.authenticationService.getNewToken(); // To get new token
        // this.authenticationService.getNewTokenHandler(); // To get new token after 2 minutes
        this.collapsible();
        this.dropDownTrigger();
        // tslint:disable-next-line:only-arrow-functions
        // this.socket.on('connect', function() {
        //     console.log('Connected');
        //     // this.socket.emit('my event', {
        //     //     data: 'logged_in_user_id'
        //     // });
        // });
        // tslint:disable-next-line:only-arrow-functions
        // this.socket.on('connection response', function(data: any) {
        //     if (data.status === 'connect') {
        //         console.log('Connected');
        //     }
        //     if (data.status === 'disconnect') {
        //         console.log('Disconnected');
        //     }
        // });

        // tslint:disable-next-line:only-arrow-functions
        // this.socket.on('message', function(data: any) {
        //     console.log(data);
        //     if (data.status === 'Success') {
        //         console.log('Success');
        //     }
        // });
    }

    collapsible() {
        const elems = document.querySelectorAll('.collapsible');
        const options = {};
        const instances = M.Collapsible.init(elems, options);
    }

    dropDownTrigger() {
        const elems = document.querySelectorAll('.dropdown-trigger');
        const options = {};
        const instances = M.Dropdown.init(elems, options);
    }
}
