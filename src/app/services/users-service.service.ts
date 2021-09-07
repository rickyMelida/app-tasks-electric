import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  server = `http://${localStorage.getItem('ip')}:${localStorage.getItem('port')}/`;

  global = `${this.server}api/user/`;

  constructor(private _http: HttpClient) { }

  getUsers(token) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.global + 'get-users', { headers: header });
  }

  setUser(token, data) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(this.global + 'set-user', data, {headers: header});
  }
}
