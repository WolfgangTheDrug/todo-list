import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Task} from "@doist/todoist-api-typescript";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class TasksService {
  apiToken: string = '396001bee5718e9b7b0486d6bb57f6e7700f59dd';
  apiUrl: string = 'https://api.todoist.com/rest/v2/tasks'
  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.apiToken}`
  })
  params = new HttpParams({fromObject: { sync_token: '*', resource_types: '["items"]' }})

  // constructor(private _http: HttpClient) {}
  _http: HttpClient = inject(HttpClient);

  getAllTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this.apiUrl, {headers: this.httpHeaders, params: this.params})
  }

  sendTask(content: string): Observable<Task> {
    return this._http.post<Task>(this.apiUrl, {"content": content}, {headers: this.httpHeaders})
  }

  closeTask(id: string): Observable<Task> {
    const taskUrl: string = `${this.apiUrl}/${id}/close`;
    return this._http.post<Task>(taskUrl, {}, {headers: this.httpHeaders})
  }

  reopenTask(id: string): Observable<Task> {
    const taskUrl: string = `${this.apiUrl}/${id}/reopen`;
    return this._http.post<Task>(taskUrl, {}, {headers: this.httpHeaders})
  }

  // updateTask(id: string, isCompleted: boolean): Observable<Task> {
  //   const taskUrl: string = `${this.apiUrl}/${id}`;
  //   return this._http.post<Task>(taskUrl, {"is_completed": isCompleted}, {headers: this.httpHeaders})
  // }

  removeTask(id: string): Observable<ArrayBuffer> {
    const taskUrl: string = `${this.apiUrl}/${id}`;
    return this._http.delete<ArrayBuffer>(taskUrl, {headers: this.httpHeaders})
  }
}
