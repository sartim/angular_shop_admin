import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user.service';

@Injectable()
export class  CategoryService {
    constructor(private http: Http, private userService: UserService, ) { }

    getCategory(offset: number) {
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/categories/' + '?offset=' + offset,
          this.userService.jwt()).map((response: Response) => response.json())
    }

    getCategoryById(id: number) {
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/categories/' + id + '/',
          this.userService.jwt()).map((response: Response) => response.json());
    }
}
