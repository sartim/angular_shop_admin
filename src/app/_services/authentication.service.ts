import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        // @ts-ignore
        const body = JSON.stringify({ email, password });
        const headers =  new HttpHeaders({
            'Content-Type': 'application/json'
        });
        const options = { headers };

        const login = this.http.post(  '/account/generate/jwt/', body, options)
            // @ts-ignore
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const user = response.json();
                // @ts-ignore
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // @ts-ignore
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });

        return login;
    }

    refresh() {
            const body = localStorage.getItem('currentUser');
            const headers =  new HttpHeaders({
                'Content-Type': 'application/json'
            });
            const options = { headers };

            const refresh = this.http.post('https://ordering-api.herokuapp.com/api/v1/auth/token-refresh/', body, options)
                // @ts-ignore
                .map((response: Response) => {
                    // login successful if there's a jwt token in the response
                    const user = response.json();
                    // @ts-ignore
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        // @ts-ignore
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        console.log('updated token');
                    }
                    return user;
                });

            return refresh;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loggedUser');
    }

    getNewTokenHandler() {
        setInterval(() => this.getNewToken(), 120000);
    }

    getNewToken() {
        if (localStorage.getItem('currentUser')) {
            this.refresh().subscribe();
            return;
        } else {
            return false;
        }
    }
}
