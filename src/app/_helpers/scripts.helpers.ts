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

}
