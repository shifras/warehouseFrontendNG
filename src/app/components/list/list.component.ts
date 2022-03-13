import { Component, OnInit } from '@angular/core';
import { Preke } from 'src/app/models/preke.model';
import { PrekesService } from 'src/app/services/prekes.service';

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

  constructor(private prekiuService: PrekesService) { }

  private loadPrekiuList(){
    this.isLoading=true;
    this.prekiuService.getPrekes().subscribe(
      {
        next:(response)=>{
        this.prekiuSarasas=response;
        this.isLoading=false;
        },
        error:(response)=>{
          this.isError=true;
      }
    }
    );
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
