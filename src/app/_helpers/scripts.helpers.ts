import {Injectable} from '@angular/core';

@Injectable()
export class ScriptHelper {

    constructor() {}

    initScript() {
        document.body.style.display = 'block';
        document.documentElement.style.display = 'block';
        document.body.style.backgroundColor = '#f9f9f9';
        // @ts-ignore
        document.getElementById('header').style.display = 'block';
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

    handlePageClick(page: number, recordCount: number) {
        let str = '';
        const totalPages = Math.ceil(recordCount / 20);
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
        return str;
    }

}
