import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
// @ts-ignore
import apiUrl from '../config/api';


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
        const login = this.http.post<any>(apiUrl +  '/api/v1/auth/generate-jwt', body, options)
            .pipe(map((response: Response) => {
                // login successful if there's a jwt token in the response
                // @ts-ignore
                if (response && response.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    // @ts-ignore
                    localStorage.setItem('currentUser', JSON.stringify(response));
                }
                return response;
            }));

        return login;
    }

    refresh() {
            let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            const headers =  new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + currentUser.refresh_token
            });
            const options = { headers };


            const refresh = this.http.post<any>(apiUrl +  '/api/v1/auth/refresh-jwt', null, options)
                .pipe(map((response: Response) => {
                    // login successful if there's a jwt token in the response
                    // @ts-ignore
                    if (response && response.access_token) {
                        const responseString = JSON.stringify(response);
                        const responseObj = JSON.parse(responseString);
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        // @ts-ignore
                        // tslint:disable-next-line:variable-name
                        const access_token = responseObj.access_token;
                        currentUser = {...currentUser, access_token};
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));
                    }
                    return response;
                }));

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
