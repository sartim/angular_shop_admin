import { Injectable } from '@angular/core';
import {Product, User} from '../_models';
// @ts-ignore
import apiUrl from '../config/api.js';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserService {
    constructor(private http: HttpClient, private authService: AuthenticationService, ) {}
    fetch() {
        return this.http.get(apiUrl + '/api/v1/auth/generate-jwt', this.authService.jwt())
            // @ts-ignore
        .map((response: Response) => {
            const loggedInUser = response.json();
            if (loggedInUser) {
                // store user details in local storage to keep user logged in between page refreshes
                // @ts-ignore
                localStorage.setItem('loggedUser', JSON.stringify(loggedInUser));
            }
            return loggedInUser;
        });
    }
    getUsers(page: number) {
        // @ts-ignore
        return this.http.get<User>(apiUrl + '/api/v1/users' + '?page=' + page, this.authService.jwt());
    }

    getUserById(id: number | null) {
        // @ts-ignore
        return this.http.get<User>(apiUrl + '/api/v1/users/' + id, this.authService.jwt());
    }

    create(user: User) {
        // @ts-ignore
        return this.http.post<User>(apiUrl + '/api/v1/users', user, this.authService.jwt());
    }

    update(user: User) {
        // @ts-ignore
        return this.http.put<User>(apiUrl + '/api/v1/users' + user.id, user, this.authService.jwt());
    }

    delete(id: number | null) {
        // @ts-ignore
        return this.http.delete<User>(apiUrl + '/api/v1/users' + id, this.authService.jwt());
    }
}
