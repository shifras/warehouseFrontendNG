import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nevigation',
  templateUrl: './nevigation.component.html',
  styleUrls: ['./nevigation.component.css']
})
export class NevigationComponent implements OnInit {

  constructor(public user:UserService) { }

  ngOnInit(): void {
  }

  logoutButton(){
    this.user.logout();
  }
}
