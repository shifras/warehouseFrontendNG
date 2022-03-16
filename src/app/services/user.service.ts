import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  public user:User=null;

  private loggedIn=false;



  constructor(private router:Router) { }

  public login(username, password){
    this.user=new User(username, password);
    this.loggedIn=true;
    //cia toks specifinis kintamasis kuris yra globalus
    localStorage.setItem("user",btoa(JSON.stringify(this.user)));
  }

  public autoLogin(){
    const user:User=JSON.parse( atob(localStorage.getItem("user")));
    //patikrinam ar vartotojo duomenys yra localstorage
    if (!user){
      //jei nera userio nutraukiam vykdyma
      return;
    }
    //patikrinam ar nesibaige userio laikas (1val)
    if (user.isExpired){
      localStorage.removeItem("user");
      return;
    }
    this.user=user;
    this.loggedIn=true;
  }

  public logout(){
    this.user=null;
    this.loggedIn=false;
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }

  public isLoggedIn(){
    return this.loggedIn;
  }

}
