import { Component, OnInit } from '@angular/core';
import { ListItem } from "./list-item";
import { Task } from "@doist/todoist-api-typescript"
import { Observable } from "rxjs";
import {HttpClientModule, HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {MatSelectionListChange} from "@angular/material/list";
@Component({
  selector: 'app-root',
  templateUrl: './index.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: string = 'TODO-list';
  filters: ('all' | 'active' | 'done')[] = ['active', 'done', 'all'];
  filter: 'all' | 'active' | 'done' = 'active'
  allItems: ListItem[] = [
    {id: '0', content: 'aaaaa', isCompleted: false},
    {id: '1', content: 'bbbbb', isCompleted: true},
    {id: '2', content: 'ccccc', isCompleted: false}
  ];
  state: 'default' | 'addingTask' = 'default'

  toggleInputState() {
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
    this.sendTask(content)
    this.toggleInputState()
  }

  changeFilter(event: MatTabChangeEvent): void {
    this.filter = this.filters[event.index]
  }

  get items(): ListItem[] {
    return this.filter === 'all'
      ? this.allItems
      : this.allItems.filter(
        item => this.filter === 'done' ? item.isCompleted : !item.isCompleted
      );
  }

  constructor(private _http: HttpClient) {}
  apiToken: string = '396001bee5718e9b7b0486d6bb57f6e7700f59dd';
  apiUrl: string = 'https://api.todoist.com/rest/v2/tasks'
  httpHeaders: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer: ${this.apiToken}`,
    // Origin: 'http://localhost:4280'
  })
  params = new HttpParams({fromObject: { sync_token: '*', resource_types: '["items"]' }})

  getAllTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(this.apiUrl, {headers: this.httpHeaders, params: this.params})
  }

  sendTask(content: string): void {
    console.log(content)
    this._http.post(this.apiUrl, {"content": content}, {headers: this.httpHeaders}).subscribe()
  }

  ngOnInit(): void {
    this.getAllTasks().subscribe(tasks => this.allItems = {...tasks});
  }
}
