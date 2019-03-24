import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import apiUrl from '../config/api.js';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(email: string, password: string) {
        const body = JSON.stringify({ email: email, password: password });
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        const login = this.http.post(apiUrl + '/account/generate/jwt/', body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });

        return login
    }

    refresh() {
            let body = localStorage.getItem('currentUser');
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            let refresh = this.http.post('https://ordering-api.herokuapp.com/api/v1/auth/token-refresh/', body, options)
                .map((response: Response) =>
                {
                    // login successful if there's a jwt token in the response
                    let user = response.json();
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        console.log("updated token");
                    }
                    return user;
                });

            return refresh
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loggedUser');
    }

    getNewTokenHandler(){
        setInterval(() => this.getNewToken(), 120000);
    }

    getNewToken() {
        if (localStorage.getItem('currentUser')){
            this.refresh().subscribe();
        } else {
            return false;
        }
    }
}
