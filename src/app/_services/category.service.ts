import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class  CategoryService {
    constructor(private http: HttpClient, private userService: UserService, ) { }

    getCategory(offset: number) {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/categories/' + '?offset=' + offset, this.userService.jwt()).map((response: Response) => response.json());
    }

    getCategoryById(id: string | null) {
        // @ts-ignore
        // tslint:disable-next-line:max-line-length
        return this.http.get('https://ordering-api.herokuapp.com/api/v1/categories/' + id + '/', this.userService.jwt()).map((response: Response) => response.json());
    }
}
