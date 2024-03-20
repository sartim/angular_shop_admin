import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {AlertService, AuthenticationService, UserService} from '../_services';
import { UserDetail } from '../_models';

@Component({
    moduleId: module.id,
    templateUrl: 'user-detail.component.html',
    styles: [`
        .form-label {
            margin-left: 10px;
        }
    `]
})
export class UserDetailComponent implements OnInit {
    user: UserDetail | undefined;

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location) {
        this.user = new UserDetail();
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const idFromRoute = String(routeParams.get('id'));
        this.userService.getById(idFromRoute).subscribe(
            (user: UserDetail) => {this.user = user},
            (error) => {
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
            });
    }

    private getDel(id: any) {
      this.userService.getById(id).subscribe(
          (user: UserDetail) => {this.user = user},
          (error) => {
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
          });
    }

    goBack(): void {
        this.location.back();
    }
}
