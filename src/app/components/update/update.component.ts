import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preke } from 'src/app/models/preke.model';
import { PrekesService } from 'src/app/services/prekes.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
  // ,styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  public id;
  public name;
  public description;
  public ammount;
  public price;
  public image;
  public error=null;
  public isNoEntry=true;
  public isNameValid=true;



  constructor(
    private route:ActivatedRoute, //cia susikuriam kintamaji nuorodos, per kuria pasiimam update kintamojo ID
    private prekesService:PrekesService,
    private router:Router
    ) { }


  ngOnInit(): void {
    //paimamas prekes id is nuorodos
    this.id=this.route.snapshot.params['id']; //snapshot tai kaip dabar atrodo routo nuoroda

    //Paprasom serviso kad paimtu prekes observable pagal ta ID
    this.prekesService.getPreke(this.id).subscribe(
      {
      next: (preke)=>{
        this.name=preke.name;
        this.description=preke.description;
        this.ammount=preke.ammount;
        this.price=preke.price;
        this.image=preke.image;
        this.isNoEntry=false;
      }, 
      error:(response)=>{
        this.isNoEntry=true;
        this.error=response.error.name;
      }
    }
    );

  }

  public onSubmit(form){
    this.prekesService.updatePreke(this.id, this.name, this.description, this.price, this.ammount, this.image).subscribe(
      (preke)=>{
      this.router.navigate(["/"])}, 
      
      (response)=>{
        this.error=this.error="Ivyko klaida atnaujinant irasa serveryje.<br><span><b>"+response.error.name+"</b></span>";
      }
    );
  }

  public onNameUpdate(){
    this.prekesService.isNameAvailable(this.name, this.id).subscribe(
      (response)=>{
        this.isNameValid=response;
      }
    )
  }
}
