import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {HttpClient} from '@angular/common/http';
import {Product, ProductDetail} from '../_models';
// @ts-ignore
import apiUrl from '../config/api.js';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private authService: AuthenticationService, ) { }

    getProducts(page: number) {
        return this.http.get<Product>(apiUrl + '/api/v1/products' + '?page=' + page, this.authService.jwt());
    }

    getProductById(id: string | null) {
        return this.http.get<ProductDetail>(apiUrl + '/api/v1/products/' + id, this.authService.jwt());
    }
}
