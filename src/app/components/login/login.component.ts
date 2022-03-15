import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public username=null;
public password=null;

  constructor(public user:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  public onLogin(){
    this.user.login(this.username, this.password);
    this.router.navigate(["/"]);
  }

}
