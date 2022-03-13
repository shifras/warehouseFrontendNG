import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrekesService } from 'src/app/services/prekes.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

@Input() preke; //sita preke ateina is *ngFor ciklo, kuriame mes nusirodem [preke]="preke". Skliausteiuose galima pasirasyti pavadinima jeigu nesutampa kintamuju vardai.
@Output() afterDelete=new EventEmitter<String>();

  constructor(private prekiuService:PrekesService) { }

  ngOnInit(): void {
  }

  public delete(id){
    this.prekiuService.deletePreke(id).subscribe(
    (result)=>{
      this.afterDelete.emit();
    }
    ,(response)=>{
      this.afterDelete.emit(response.error.name);
    }
    );
    

}
}
