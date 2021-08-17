/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TasksServicesService {
  server = `http://${localStorage.getItem('ip')}:${localStorage.getItem('port')}/`;

  global = `${this.server}api/`;

  constructor(private _http: HttpClient) { }

  test() {
    return this._http.get(this.global + 'api');
  }

  addPendingTask(tasks, token) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.post(this.global + 'task/set-pending-task', tasks, { headers: header });
  }

  addFinishedTask(tasks, token) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`).append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000/api/task/set-finished-task');
    return this._http.post(this.global + 'task/set-finished-task', tasks, { headers: header });

  }

  getPendingTasks(token) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.global + 'task/get-pending-tasks', { headers: header });
  }

  getFinishedTasks(token) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.global + 'task/get-finished-tasks', { headers: header });
  }

  getTasks(token) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.global + 'task/get-tasks', { headers: header });
  }

  getHours(token) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._http.get(this.global + 'task/get-hours', { headers: header });
  }
}
