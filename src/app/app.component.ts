import {Component, OnInit} from '@angular/core';
import {FilterType, ListItem} from "./list-item";
import {Task} from "@doist/todoist-api-typescript"
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatListOption} from "@angular/material/list";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: string = 'TODO-list';
  filters: FilterType[] = [FilterType.ALL, FilterType.ACTIVE, FilterType.DONE];
  filter: FilterType = FilterType.ACTIVE;
  allItems: ListItem[] = [];
  state: 'default' | 'addingTask' = 'default'

  apiToken: string = '396001bee5718e9b7b0486d6bb57f6e7700f59dd';
  apiUrl: string = 'https://api.todoist.com/rest/v2/tasks'
  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.apiToken}`
  })
  params = new HttpParams({fromObject: { sync_token: '*', resource_types: '["items"]' }})

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.getAllTasks().subscribe(tasks => {
      this.allItems = tasks
    });
  }

  toggleInputState(): void {
    if (this.state === 'default') {
      this.state = 'addingTask';
    } else {
      this.state = 'default';
    }
  }

  cancelNewItem(): void {
    this.toggleInputState()
  }

  acceptNewItem(content: string): void {
    this.sendTask(content).subscribe(
      task => this.allItems.push(task),
    )
    this.toggleInputState()
  }

  toggleCompleted(option: MatListOption): void {
    if (option.selected) {
      this.closeTask(option.value).subscribe();
    } else {
      this.reopenTask(option.value).subscribe();
    }
  }

  deleteItem(id: string): void {
    this.removeTask(id).subscribe();
    this.allItems.splice(
      this.allItems.indexOf(
        this.allItems.find(
          e => e.id === id
        )!
      ), 1
    )
  }

  changeFilter(event: MatTabChangeEvent): void {
    this.filter = this.filters[event.index]
  }

  get items(): ListItem[] {
    if(this.filter === FilterType.ALL) {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === FilterType.DONE ? item.isCompleted : !item.isCompleted);
  }

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
