import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nevigation',
  templateUrl: './nevigation.component.html',
  styleUrls: ['./nevigation.component.css']
})
export class NevigationComponent implements OnInit {
  public user:User;

  constructor(public userService:UserService) { 
    
   }

  ngOnInit(): void {
    this.user=this.userService.user;
  }

  logoutButton(){
    this.userService.logout();
  }
}
