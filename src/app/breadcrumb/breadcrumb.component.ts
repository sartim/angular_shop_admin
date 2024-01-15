import {ChangeDetectionStrategy, Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';


@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    moduleId: module.id,
    selector: 'app-breadcrumb',
    templateUrl: 'breadcrumb.component.html',
    styles: [`
        .nav-wrapper {
            margin-left: 33px;
        }
    `]
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs!: SafeHtml;

    constructor(private sanitizer: DomSanitizer, private ngZone: NgZone) {
        this.breadcrumbs = '';
    }

    ngOnInit() {
        //
    }

    ngDoCheck() {
        const path = window.location.pathname;
        const pathArray = path.split('/');
        let html = '';
        if(path === '/') {
             html += '<a class="breadcrumb">Home</a>'
        } else {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < pathArray.length; i++) {
            if(pathArray[i] === '') {
                html += '<a class="breadcrumb">Home</a>'
            } else {
                html += '<a class="breadcrumb" style="text-transform: capitalize">' + pathArray[i] + '</a>'
            }
            }
        }
        this.breadcrumbs = this.sanitizer.bypassSecurityTrustHtml(html);
    }

}
