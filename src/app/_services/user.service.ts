import { Injectable } from '@angular/core';
import { User } from '../_models';
// @ts-ignore
import apiUrl from '../config/api.js';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    fetch() {
        return this.http.get(apiUrl + '/account/generate/jwt/', this.jwt())
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
        return this.http.get('/account/user/', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        // @ts-ignore
        return this.http.get('/account/user/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        // @ts-ignore
        return this.http.post(apiUrl + '/api/v1/auth/register/', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        // @ts-ignore
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        // @ts-ignore
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    // @ts-ignore
    jwt() {
        // create authorization header with jwt token
        // @ts-ignore
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers =  new HttpHeaders({ Authorization: 'JWT ' + currentUser.token });
            const options = { headers };
            return options;
        }
    }
}
