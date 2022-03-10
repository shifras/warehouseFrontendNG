import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrekesService } from 'src/app/services/prekes.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  public name=null;
  public isNameValid=true;
  constructor(private prekiuService: PrekesService, private router:Router) { }

  ngOnInit(): void {
  }

  public onSubmit(form){
    let values=form.form.value;

    this.prekiuService.isNameAvailable(this.name).subscribe(
      (response)=>{
        if (response==true) this.prekiuService.addPreke(null, values.name, values.description, values.price, values.ammount, values.image).subscribe(
          (response)=>{
            this.router.navigate(["/"]);
          }
      );
      else this.isNameValid=false;

      }
    );
    
    
  }

  public onNameUpdate(){
    this.prekiuService.isNameAvailable(this.name).subscribe(
      (response)=>{
        this.isNameValid=response;
      }
    )
  }
  
}
