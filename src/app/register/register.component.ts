﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.initScript();
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                (data: any) => {
                    // this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                (error: string) => {
                    // this.alertService.error(error);
                    this.loading = false;
                });
    }

    initScript() {
        // @ts-ignore
        document.getElementById('header').style.display = 'none';
        // @ts-ignore
        document.getElementById('left-sidebar-nav').style.display = 'none';
        // @ts-ignore
        document.getElementById('fab_id').style.display = 'none';
    }
}
