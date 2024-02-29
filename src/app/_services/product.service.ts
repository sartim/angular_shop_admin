import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { Product, ProductDetail } from '../_models';

@Injectable()
export class ProductService extends BaseService<Product, ProductDetail> {
  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService, 'api/v1/products');
  }
}
