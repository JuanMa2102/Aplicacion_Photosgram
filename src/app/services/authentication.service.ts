import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';

import { tap } from 'rxjs/operators';

import {environment} from '../../environments/environment'

const CLIENT_ID = environment.clientId;
const CLIENT_SECRET = environment.clientSecret;
const URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    const data = {
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username,
      password,
      scope: ''
    };

    return this.http.post(`${ URL }/oauth/token`, data)
      .pipe(
        tap(
          (response: any) => {
            console.log(response);
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            localStorage.setItem('email', data.username)
          }
        )
      );
  }

  token(){
    return localStorage.getItem('access_token');
  }

  getCurrentUser(){
    return localStorage.getItem('email');
  }

  logout(){
    localStorage.clear();
  }

}
