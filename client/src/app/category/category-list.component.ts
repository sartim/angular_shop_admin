import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { CategoryService } from '../_services/index';
import { Category } from '../_models/index';


@Component({
    moduleId: module.id,
    templateUrl: 'category-list.component.html',
    styles: [`
        td {
            white-space: nowrap;
        }
    `]
})
export class CategoryListComponent implements OnInit {
    categories: Category;
    users: User[] = [];

    loggedUser: User;

    private f = 0;

    constructor(
        private categoryService: CategoryService,
        private router: Router) { }

    ngOnInit() {
      this.loadCategories(0);
    }

    gotoDetail(id: number) {
      this.router.navigate(['/category-detail', id]);
    }

    pageOffset() {
      const inc_offset = this.f += 20;
      this.loadCategories(inc_offset);
    }

    private loadCategories(offset) {
      const load_all_ = this.categoryService.getCategory(offset);
      load_all_.subscribe(categories => { this.categories = categories; });
    }
}
