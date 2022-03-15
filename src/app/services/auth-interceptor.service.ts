

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

import { Injectable } from '@angular/core';

// sitas injectable nebereikalingas
@Injectable({
  providedIn: 'root'
}) 



export class AuthInterceptorService implements HttpInterceptor {

  constructor( private user:UserService ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //sitas programinis kodas pasileidzia pries vykdant bet kokia http uzklausa

    let newReq=req.clone({
      headers:req.headers.append("authorization","Basic "+btoa(this.user.username+":"+this.user.password))
    });


    return next.handle(newReq);
  }
}
