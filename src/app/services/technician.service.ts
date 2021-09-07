/* eslint-disable no-underscore-dangle */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  server = `http://${localStorage.getItem('ip')}:${localStorage.getItem('port')}/`;

  global = `${this.server}api/technician/`;

  constructor(private _http: HttpClient) { }

  getTechnicians(token) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.global + 'get-technicians', { headers: header });
  }

  setTechnician(token, data) {
    const header = new HttpHeaders().set('Autorization', `Bearer ${token}`);
    return this._http.post(this.global + 'set-technician', data, {headers: header});
  }
}
