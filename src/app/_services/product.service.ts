import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product, ProductDetail} from '../_models';
// @ts-ignore
import apiUrl from '../config/api.js';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient, private userService: UserService, ) { }

    getProducts(page: number) {
        return this.http.get<Product>(apiUrl + '/api/v1/products' + '?page=' + page, this.userService.jwt());
    }

    getProductById(id: string | null) {
        return this.http.get<ProductDetail>(apiUrl + apiUrl + '/api/v1/products' + id, this.userService.jwt());
    }
}
