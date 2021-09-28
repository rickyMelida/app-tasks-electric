/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  server = `http://${localStorage.getItem('ip')}:${localStorage.getItem('port')}/`;

  global = `${this.server}api/auth/`;

  constructor(private _http: HttpClient) { }

  signin(dataUser) {
    return this._http.post(this.global + 'signin', dataUser);
  }

  signinAdmin(dataUser) {
    return this._http.post(this.global + 'signin-admin', dataUser);
  }

  verifyToken(token: any) {
    return this._http.get(this.global + '/token-verify?token=' + token);
  }

  signUp(token, data) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(this.global + 'signup', data, {headers: header})
  }

}
