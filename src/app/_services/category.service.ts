import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import apiUrl from '../config/api.js';

@Injectable()
export class  CategoryService {
    constructor(private http: HttpClient, private authService: AuthenticationService, ) { }

    getCategory(offset: number) {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get(apiUrl +'/api/v1/categories' + '?page=' + offset, this.authService.jwt()).map((response: Response) => response.json());
    }

    getCategoryById(id: string | null) {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get(apiUrl + '/api/v1/categories/' + id + '/', this.authService.jwt()).map((response: Response) => response.json());
    }
}
