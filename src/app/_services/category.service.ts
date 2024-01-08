import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {HttpClient} from '@angular/common/http';
import {Category, CategoryDetail} from '../_models';
// @ts-ignore
import apiUrl from '../config/api.js';

@Injectable()
export class  CategoryService {
    constructor(private http: HttpClient, private authService: AuthenticationService, ) { }

    getCategories(page: number) {
        return this.http.get<Category>(apiUrl +'/api/v1/categories' + '?page=' + page, this.authService.jwt());
    }

    getCategoryById(id: string | null) {
        return this.http.get<CategoryDetail>(apiUrl + '/api/v1/categories/' + id, this.authService.jwt());
    }
}
