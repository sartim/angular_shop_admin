import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
// @ts-ignore
import apiUrl from '../config/api';

@Injectable()
export class BaseService<ParentResponse, ChildResponse> {
  constructor(
    protected http: HttpClient,
    protected authService: AuthenticationService,
    @Inject('endpoint') protected endpoint: string
  ) {}

  getAll(page: number) {
    return this.http.get<ParentResponse>(`${apiUrl}/${this.endpoint}?page=${page}`, this.authService.jwt());
  }

  getById(id: string | null) {
    return this.http.get<ChildResponse>(`${apiUrl}/${this.endpoint}/${id}`, this.authService.jwt());
  }

  update(id: string, data: ChildResponse) {
    return this.http.put<ChildResponse>(`${apiUrl}/${this.endpoint}/${id}`, data, this.authService.jwt());
  }

  create(data: ChildResponse) {
    return this.http.post<ChildResponse>(`${apiUrl}/${this.endpoint}`, data, this.authService.jwt());
  }

  delete(id: string) {
    return this.http.delete(`${apiUrl}/${this.endpoint}/${id}`, this.authService.jwt());
  }
}
