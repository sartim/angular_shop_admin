import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location } from '@angular/common';

import { CategoryService } from '../_services/index';
import { Category } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit {
    categories: Category[] = [];

    constructor(
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private location: Location) { }

    ngOnInit() {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.categoryService.getCategoryById(+params.get('id')))
        .subscribe(categories => this.categories = categories);
        // subscribe to router event
      // this.route.params.subscribe((params: Params) => {
      //     let id = params['id'];
      //     console.log(id);
      //     this.getDel(id);
      //   });
    }

    private getDel(id) {
      this.categoryService.getCategoryById(id).subscribe(categories => this.categories = categories);
    }

    goBack(): void {
        this.location.back();
    }
}
