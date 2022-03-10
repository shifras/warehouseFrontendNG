import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';
import { HttpClientModule } from "@angular/common/http";
import { UpdateComponent } from './components/update/update.component';
import { NevigationComponent } from './components/nevigation/nevigation.component';
import { ListItemComponent } from './components/list/list-item/list-item.component'

const appRoutes:Routes=[
  //rasymo tvarka turetu buti nuo reciausiai naudojamo iki dazniausiai, ty nuo konkreciausiu iki abstrakciausiu
  { path:'', component:ListComponent},
  {path:'new', component:NewComponent},
  {path:'update/:id', component:UpdateComponent} //:id reiskia kad kintamasis. Jeigu butu :id/:name tai kintamuju pavadinimai
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NewComponent,
    UpdateComponent,
    NevigationComponent,
    ListItemComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
