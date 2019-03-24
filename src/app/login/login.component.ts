import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services';


@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.initScript();
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    initScript() {
        document.body.style.height = '100%';
        document.body.style.display = 'table-cell';
        document.body.style.backgroundColor = '#0098e1';
        document.body.style.verticalAlign = 'middle';
        document.documentElement.style.display = 'table';
        document.documentElement.style.margin = 'auto';
        document.getElementById('header').style.display = 'none';
        document.getElementById('left-sidebar-nav').style.display = 'none';
        document.getElementById('fab_id').style.display = 'none';
        document.getElementById('main').removeAttribute('id');
    }
}
