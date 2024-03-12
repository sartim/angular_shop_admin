import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { Category, CategoryDetail } from '../_models';

@Injectable()
export class CategoryService extends BaseService<Category, CategoryDetail> {
  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService, 'api/v1/categories');
  }
}
