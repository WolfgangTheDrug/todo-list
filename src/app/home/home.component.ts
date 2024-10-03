import {Component, OnInit} from "@angular/core";
import {MatTabChangeEvent, MatTabsModule} from "@angular/material/tabs";
import {MatListModule, MatListOption} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgClass, NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatNativeDateModule} from "@angular/material/core";
import {ClickStopPropagationDirective} from "../stop-propagation.directive";
import {FilterType, ListItem} from "../list-item";
import {TasksService} from "../services/tasks.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['../new-item/new-item.component.css'],imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    // MatInputModule,
    RouterLink,
    NgIf,
    MatIconModule,
    MatNativeDateModule,
    ClickStopPropagationDirective,
    NgForOf,
    TitleCasePipe,
    NgClass,
    RouterLinkActive,
    RouterOutlet,
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  filters: FilterType[] = [FilterType.ALL, FilterType.ACTIVE, FilterType.DONE];
  filter: FilterType = FilterType.ACTIVE;
  allItems: ListItem[] = [];
  private _dataService: TasksService = new TasksService();

  ngOnInit(): void {
    this._dataService.getAllTasks().subscribe(tasks => {
      this.allItems = tasks
    });
  }

  changeFilter(event: MatTabChangeEvent): void {
    this.filter = this.filters[event.index]
  }

  get items(): ListItem[] {
    if (this.filter === FilterType.ALL) {
      return this.allItems;
    }
    return this.allItems.filter(item => this.filter === FilterType.DONE ? item.isCompleted : !item.isCompleted);
  }

  acceptNewItem(content: string): void {
    this._dataService.sendTask(content).subscribe(
      task => this.allItems.push(task),
    )
    // this.toggleInputState()
  }

  toggleCompleted(option: MatListOption): void {
    if (option.selected) {
      this._dataService.closeTask(option.value).subscribe();
    } else {
      this._dataService.reopenTask(option.value).subscribe();
    }
  }

  deleteItem(id: string): void {
    this._dataService.removeTask(id).subscribe();
    this.allItems.splice(
      this.allItems.indexOf(
        this.allItems.find(
          e => e.id === id
        )!
      ), 1
    )
  }
}
