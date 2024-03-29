import {ActivatedRoute, Router} from '@angular/router';
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {User} from '../_models';
import {AlertService, AuthenticationService, CategoryService} from '../_services';
import {Category} from '../_models';
import {HttpClient} from '@angular/common/http';
import {CurrencyPipe, UpperCasePipe} from '@angular/common';
import {ScriptHelper} from '../_helpers/scripts.helpers';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    moduleId: module.id,
    templateUrl: 'category-list.component.html',
    styles: [`
        .table-card {
          overflow:auto;
          padding: 0;
        }
    `]
})
export class CategoryListComponent implements AfterViewInit, OnInit, OnDestroy {
    categories!: Category;
    users: User[] = [];
    loggedUser!: User;
    dtOptions: DataTables.Settings = {};
    returnUrl!: string;
    loading = false;
    isPaginationHidden = true;
    previous = false;
    next = false;
    startEntry = 0;
    endEntry = 0;
    totalEntries = 0;
    entryPoint = 1;
    pages!: SafeHtml;
    pageSelector!: string;
    private f = 0;

    constructor(
        private sanitizer: DomSanitizer,
        private elementRef: ElementRef,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private pipeInstance: UpperCasePipe,
        private pipeCurrencyInstance: CurrencyPipe,
        private categoryService: CategoryService,
        private helpers: ScriptHelper,
        private renderer: Renderer2,
        private router: Router) {
            this.categories = new Category();
    }

    ngOnInit() {
        this.helpers.initScript();
        this.startEntry = this.entryPoint;
        this.endEntry = 20;
        this.entryPoint = this.entryPoint + 20;
        this.loadAll(1, this.startEntry, this.endEntry);
        // tslint:disable-next-line:no-string-literal
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }

    ngAfterViewInit(): void {
        //
    }

    gotoDetail(id: number) {
      this.router.navigate(['/category/detail', id]);
    }

    pageClick(url: string, isNext: boolean): void {
        this.isPaginationHidden = true;
        const page = Number(this.helpers.getParameterByName('page', url));
        const entry = this.helpers.handlePageEntry(isNext)
        if (page != null) {
            if(page !== 0) {
                this.loadAll(page, entry.startEntry, entry.endEntry);
            }
        }
    }

    private loadAll(page: number, startEntry: number, endEntry: number) {
        this.loading = true;
        this.previous = false;
        this.isPaginationHidden = true;
        this.categories = new Category();
        const loadAll = this.categoryService.getAll(page);
        loadAll.subscribe((category: Category) => {
                this.categories = category;
                this.loading = false;
                this.isPaginationHidden = false;
                const recordCount = this.categories.count;
                const previousPageUrl = this.categories.previous;
                const nextPageUrl = this.categories.next;
                const pageData = this.helpers.handlePageClick(page, recordCount, previousPageUrl, nextPageUrl, startEntry, endEntry)
                this.previous = pageData.previous;
                this.next = pageData.next;
                this.pageSelector = ''; // disabled
                this.pages = this.sanitizer.bypassSecurityTrustHtml(pageData.innerHTML);
            },
            (error) => {
                this.loading = false;
                if (error.status === 401) {
                    this.alertService.error(error);
                    this.authenticationService.logout();
                }
            });
    }

    gotoPage(event: Event, startEntry: number, endEntry: number): void {
        const clickedElement = event.target as HTMLElement;
        if (clickedElement.classList.contains('current_page')) {
          const pageNumber = +clickedElement.innerText;
          this.loadAll(pageNumber, startEntry, endEntry)
        }
    }

    _delete(id: string) {
        alert('You are not authorized to perform action');
    }

    ngOnDestroy(): void {
        //
    }
}
