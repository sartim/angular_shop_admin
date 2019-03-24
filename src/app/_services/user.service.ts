import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models';
import apiUrl from '../config/api.js';

@Injectable()
export class UserService {
    constructor(private http: Http) { }
    fetch() {
        return this.http.get(apiUrl + '/account/generate/jwt/', this.jwt())
        .map((response: Response) => {
            const loggedInUser = response.json();
            console.log(loggedInUser);
            if (loggedInUser) {
                // store user details in local storage to keep user logged in between page refreshes
                localStorage.setItem('loggedUser', JSON.stringify(loggedInUser));
            }
            return loggedInUser;
        });
    }
    getAll() {
        return this.http.get('/account/user/', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/account/user/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(apiUrl + '/api/v1/auth/register/', user,
            this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ Authorization: 'JWT ' + currentUser.token });
            return new RequestOptions({ headers });
        }
    }
}
