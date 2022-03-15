import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preke } from 'src/app/models/preke.model';
import { PrekesService } from 'src/app/services/prekes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public prekiuSarasas:Preke[]=[];
  public isLoading=true;
  public isError=false;
  public error;

  constructor(private prekiuService: PrekesService, private user: UserService, private router: Router) {
    if (!user.isLoggedIn()){
      this.router.navigate(["/login"]);
      console.log("cia konsole");
    }
   }

  

  private loadPrekiuList(){
    this.isLoading=true;
    this.prekiuService.getPrekes()
    .subscribe({
        next:(response)=>{
        this.prekiuSarasas=response;
        this.isLoading=false;
        },
        error:(response)=>{
          
          this.isError=true;
      }
    });
  }

  ngOnInit(): void {
    this.loadPrekiuList();
    
  }

  // public delete(id){
  //   this.prekiuService.deletePreke(id).subscribe(
  //     (result)=>{
  //     this.loadPrekiuList();
  //   },
  //   (response)=>{
  //     this.isError=true;
  //     this.error=response.error.name;
  //   }
  //   );
  // }

  public afterDelete(tekst){
    if (tekst==null){
      this.loadPrekiuList();
    } else {
      this.error=tekst;
      this.isError=true;
    }
    
  }

}
