import {provideRouter, Routes} from "@angular/router";
import {ApplicationConfig} from "@angular/platform-browser";
import {HomeComponent} from "./home/home.component";
import {NewItemComponent} from "./new-item/new-item.component";
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatNativeDateModule} from "@angular/material/core";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'new-item',
    component: NewItemComponent
  }
]

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations()]
};
