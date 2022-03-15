import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { NewComponent } from './components/new/new.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UpdateComponent } from './components/update/update.component';
import { NevigationComponent } from './components/nevigation/nevigation.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { LoginComponent } from './components/login/login.component'
import { PrekesService } from './services/prekes.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const appRoutes:Routes=[
  //rasymo tvarka turetu buti nuo reciausiai naudojamo iki dazniausiai, ty nuo konkreciausiu iki abstrakciausiu
  { path:'', component:ListComponent},
  {path:'new', component:NewComponent},
  { path: 'login', component:LoginComponent},
  {path:'update/:id', component:UpdateComponent} //:id reiskia kad kintamasis. Jeigu butu :id/:name tai kintamuju pavadinimai
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    NewComponent,
    UpdateComponent,
    NevigationComponent,
    ListItemComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
