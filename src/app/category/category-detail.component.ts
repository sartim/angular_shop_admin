import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AlertService, AuthenticationService, CategoryService } from '../_services';
import { CategoryDetail } from '../_models';

@Component({
    moduleId: module.id,
    templateUrl: 'category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {
    category: CategoryDetail | undefined;

    constructor(
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private location: Location) {
            this.category = new CategoryDetail();
    }

    ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const idFromRoute = String(routeParams.get('id'));
        this.categoryService.getCategoryById(idFromRoute).subscribe(
            (category: CategoryDetail) => {this.category = category},
            (error) => {
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
            });
    }

    private getDel(id: any) {
      this.categoryService.getCategoryById(id).subscribe(
          (category: CategoryDetail) => {this.category = category},
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
