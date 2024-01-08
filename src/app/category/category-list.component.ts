import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../_services';
import { Category } from '../_models';
import {ScriptHelper} from '../_helpers/scripts.helpers';


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
    categories!: Category;
    private f = 0;

    constructor(
        private categoryService: CategoryService,
        private helpers: ScriptHelper,
        private router: Router) { }

    ngOnInit() {
        this.helpers.initScript();
        this.loadAll(1);
    }

    gotoDetail(id: number) {
      this.router.navigate(['/category-detail', id]);
    }

    pageOffset() {
      const incOffset = this.f += 20;
      this.loadAll(incOffset);
    }

    private loadAll(page: number) {
      const loadAll = this.categoryService.getCategories(page);
      loadAll.subscribe((categories: Category) => { this.categories = categories; });
    }
}
