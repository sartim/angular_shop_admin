import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        let body = JSON.stringify({ username: username, password: password });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        let login = this.http.post('http://127.0.0.1:8000/api/v1/auth/token-auth/', body, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
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

            let refresh = this.http.post('http://127.0.0.1:8000/api/v1/auth/token-refresh/', body, options)
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
