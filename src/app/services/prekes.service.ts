import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preke } from '../models/preke.model';

@Injectable({
  providedIn: 'root'
})

export class PrekesService {

public prekes: Preke[]=[
  {id:1, name:"Telefonas", description:"aprasas",price:130, ammount:22, image:"img"},
  {id:2, name:"Kompiuteris", description:"aprasas",price:1362, ammount:12, image:"img"},
];

  constructor(private http:HttpClient) { } //cia yra iskvieciams Http kliento singletonas

  public getPrekes(){
    return this.http.get<Preke[]>("http://localhost:8080/prekes/");
  }

  public addPreke(id, name, description, price, ammount, image){
   return this.http.post("http://localhost:8080/prekes/", {
      name:name,
      description:description,
      price:price,
      ammount:ammount,
      image:image
    });
    this.prekes.push(new Preke(null, name, description, price, ammount, image ));
  }

  public getPreke(id){
    return this.http.get<Preke>("http://localhost:8080/prekes/"+id);
  }

  public updatePreke(id, name, description, price, ammount, image){
    return this.http.patch("http://localhost:8080/prekes/"+id, {
      id:id,
      name:name,
      description:description,
      price:price,
      ammount:ammount,
      image:image
    });
  }

  // klaustukas reiskia kad nebutina paduoti id
  public isNameAvailable(name, id?){
    if (id==null){
      return this.http.get<boolean>("http://localhost:8080/prekes/name/"+name);
    } else {
      return this.http.get<boolean>("http://localhost:8080/prekes/"+id+"/name/"+name);
    }
  }

  public deletePreke(id){
    return this.http.delete("http://localhost:8080/prekes/"+id); //jei nera subscriberio tai nevykdo to kodo
  }
}

