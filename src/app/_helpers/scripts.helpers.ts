import {Injectable} from '@angular/core';

@Injectable()
export class ScriptHelper {
    loading = false;
    navigation = false;
    previous = false;
    next = false;
    startEntry = 0;
    endEntry = 0;
    totalEntries = 0;
    entryPoint = 1;
    pageCount = 20;

    constructor() {}

    initScript() {
        document.body.style.display = 'block';
        document.documentElement.style.display = 'block';
        document.body.style.backgroundColor = '#f9f9f9';
        // @ts-ignore
        document.getElementById('header').style.display = 'block';
        // @ts-ignore
        document.getElementById('breadcrumb').style.display = 'block';
        // @ts-ignore
        document.getElementById('left-sidebar-nav').style.display = 'block';
    }

    getParameterByName(name: string, url: string) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        // tslint:disable-next-line:one-variable-per-declaration
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    handlePageEntry(isNext: boolean, ) {
        if (isNext) {
            this.startEntry = this.entryPoint;
            this.endEntry = this.entryPoint + this.pageCount;
            this.entryPoint = this.entryPoint + this.pageCount;
        } else {
            this.startEntry = this.startEntry - this.pageCount;
            this.endEntry = this.entryPoint - this.pageCount;
            this.entryPoint = this.entryPoint - this.pageCount;
            if (this.startEntry === 1) {
                this.endEntry = this.endEntry - 1;
            }
        }
        return {
            startEntry: this.startEntry,
            endEntry: this.endEntry
        }
    }

    handlePageClick(
        page: number, recordCount: number, previousPageUrl: string, nextPagePageUrl: string, startEntry: number, endEntry: number) {
        this.previous = false;
        const previousPage = Number(this.getParameterByName('page', previousPageUrl));
        const nextPage = Number(this.getParameterByName('page', nextPagePageUrl));
        if(previousPage !== 0) {
            this.previous = true;
        } else if(nextPage !== 0) {
            this.next = true;
        }
        this.startEntry = startEntry;
        this.endEntry = endEntry;
        this.totalEntries = recordCount;
        let str = '';
        const totalPages = Math.ceil(recordCount / this.pageCount);
        const pagesToShow = 5;
        const halfPagesToShow = Math.floor(pagesToShow / 2);
        let startPage = Math.max(1, page - halfPagesToShow);
        const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
        if (endPage - startPage + 1 < pagesToShow) {
          startPage = Math.max(1, endPage - pagesToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
          if (page === i) {
            str += '<li class="active waves-effect"><a class="current_page">' + i + '</a></li>';
          } else {
            str += '<li class="waves-effect"><a class="current_page">' + i + '</a></li>';
          }
        }
        return {
            previous: this.previous,
            next: this.next,
            innerHTML: str
        };
    }

}
