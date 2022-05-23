import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Preke } from '../models/preke.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class PrekesService {

private checkLogin=(response)=>{
  if (response.status==401){
    this.user.logout();
  }
  console.log("iviko klaida. Sis kodas yra servise");
  return throwError( ()=> new Error("Jus neprisijunges") );
};

public prekes: Preke[]=[
  // {id:1, name:"Telefonas", description:"aprasas",price:130, ammount:22, image:"img"},
  // {id:2, name:"Kompiuteris", description:"aprasas",price:1362, ammount:12, image:"img"},
];

private headers=new HttpHeaders({
  authorization: 'Basic '+ btoa('labas:labas') //uzkoduoja base 64 budu
});

  constructor(private http:HttpClient, private user:UserService) { } //cia yra iskvieciams Http kliento singletonas

  public getPrekes(){
    return this.http.get<Preke[]>("http://localhost:8080/prekes/"  );//.pipe(catchError( this.checkLogin ));
  }

  public addPreke(id, name, description, price, ammount, image){
   return this.http.post("http://localhost:8080/prekes/", {
      name:name,
      description:description,
      price:price,
      ammount:ammount,
      image:image
    } );//.pipe(catchError( this.checkLogin ));
  }

  public getPreke(id){
    return this.http.get<Preke>("http://localhost:8080/prekes/"+id  ).pipe(catchError( this.checkLogin ));
  }

  public updatePreke(id, name, description, price, ammount, image){
    return this.http.patch("http://localhost:8080/prekes/"+id, {
      id:id,
      name:name,
      description:description,
      price:price,
      ammount:ammount,
      image:image
    } );//.pipe(catchError( this.checkLogin ));
  }

  // klaustukas reiskia kad nebutina paduoti id
  public isNameAvailable(name, id?){
    if (id==null){
      return this.http.get<boolean>("http://localhost:8080/prekes/name/"+name ).pipe(catchError( this.checkLogin ));
    } else {
      return this.http.get<boolean>("http://localhost:8080/prekes/"+id+"/name/"+name).pipe(catchError( this.checkLogin ));
    }
  }

  public deletePreke(id){
    return this.http.delete("http://localhost:8080/prekes/"+id  );//.pipe(catchError( this.checkLogin )); //jei nera subscriberio tai nevykdo to kodo
  }
}

