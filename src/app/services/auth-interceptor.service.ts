

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

import { Injectable } from '@angular/core';

// sitas injectable nebereikalingas
@Injectable({
  providedIn: 'root'
}) 



export class AuthInterceptorService implements HttpInterceptor {

  constructor( private userService:UserService ) { }


  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //sitas programinis kodas pasileidzia pries vykdant bet kokia http uzklausa

    if (this.userService.user!=null){
      let newReq=req.clone({
      headers:req.headers.append("authorization","Basic "+btoa(this.userService.user.username+":"+this.userService.user.password))
      
    });
    return next.handle(newReq);
  } else {
    return next.handle(req);
  }
    

    
  }
}
