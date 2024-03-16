import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { User, UserDetail } from '../_models';

@Injectable()
export class UserService extends BaseService<User, UserDetail> {
  constructor(http: HttpClient, authService: AuthenticationService) {
    super(http, authService, 'api/v1/users');
  }
}
