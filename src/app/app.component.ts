import { Component, OnInit } from '@angular/core';
import { AlertService, AuthenticationService } from './_services';
import * as M from '../assets/admin-assets/js/materialize.min';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    styles: [],
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
    Collapsible: any;
    Dropdown: any;

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        // this.authenticationService.getNewToken(); // To get new token
        // this.authenticationService.getNewTokenHandler(); // To get new token after 2 minutes
        this.collapsible();
        this.dropDownTrigger();
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
