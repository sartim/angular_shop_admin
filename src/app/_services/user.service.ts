import { Injectable } from '@angular/core';
import { User } from '../_models';
// @ts-ignore
import apiUrl from '../config/api.js';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private authService: AuthenticationService, ) { }
    fetch() {
        return this.http.get(apiUrl + '/api/v1/auth/generate-jwt', this.authService.jwt())
            // @ts-ignore
        .map((response: Response) => {
            const loggedInUser = response.json();
            console.log(loggedInUser);
            if (loggedInUser) {
                // store user details in local storage to keep user logged in between page refreshes
                // @ts-ignore
                localStorage.setItem('loggedUser', JSON.stringify(loggedInUser));
            }
            return loggedInUser;
        });
    }
    getAll() {
        // @ts-ignore
        return this.http.get(apiUrl + '/api/v1/users', this.authService.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        // @ts-ignore
        return this.http.get(apiUrl + '/api/v1/users/' + id, this.authService.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        // @ts-ignore
        return this.http.post(apiUrl + '/api/v1/users', user, this.authService.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        // @ts-ignore
        return this.http.put(apiUrl + '/api/v1/users' + user.id, user, this.authService.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        // @ts-ignore
        return this.http.delete(apiUrl + '/api/v1/users' + id, this.authService.jwt()).map((response: Response) => response.json());
    }
}
