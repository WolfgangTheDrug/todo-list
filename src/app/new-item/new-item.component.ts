import {Component} from "@angular/core";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatDateFormats} from "@angular/material/core";
import {NgForOf, NgIf} from "@angular/common";

export const GRI_DATE_FORMATS: MatDateFormats = {
  ...MAT_NATIVE_DATE_FORMATS,
  display: {
    ...MAT_NATIVE_DATE_FORMATS.display,
    dateInput: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    } as Intl.DateTimeFormatOptions,
  }
};

@Component({
  selector: 'new-item',
  templateUrl: './new-item.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./new-item.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: GRI_DATE_FORMATS },
    { provide: DateAdapter, useValue: GRI_DATE_FORMATS }
  ]
})

export class NewItemComponent {
  constructor(private readonly adapter: DateAdapter<Date>) {
    // this.adapter.setLocale("pl")
  }

  isMinuteOrDay: boolean = false;

  toggleMinuteDay($event: MouseEvent) {
    this.isMinuteOrDay = !this.isMinuteOrDay;
  }
}
