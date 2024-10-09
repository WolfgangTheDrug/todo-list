import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NewItemComponent} from "./new-item/new-item.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new-item', component: NewItemComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
