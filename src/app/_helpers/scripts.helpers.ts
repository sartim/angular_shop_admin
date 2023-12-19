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
}
