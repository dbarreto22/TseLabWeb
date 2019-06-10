import { Injectable } from '@angular/core';
import { Sesion } from './Usuarios/clases/sesion.model';
import { BehaviorSubject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class StorageService {

  private loged;
  private loged$=new BehaviorSubject<Boolean>(this.usrLogged());
  public select$():Observable<Boolean>{ 
    return this.loged$.asObservable();
  }
  constructor() { 
    this.loged=this.usrLogged();
  }

  setSession(sesion, usuario){
    localStorage.setItem('session',JSON.stringify(new Sesion(sesion,usuario)));
    console.log('Storage- setseesion next*************************');
    console.log('Se guardo la sesión*************************');
    console.log(sesion);
    this.obs();
  }

  getSession()
  {
    return localStorage.getItem('session');
  }
  
  usrLogged()
  {
    console.log('Storage - usrLogged');
    console.log(localStorage.getItem('session'));
    return localStorage.getItem('session')!=null ? true : false;
  }

  clearSession(){
    localStorage.clear();
    this.obs();
  }
  
  obs(){
    this.loged$.next(this.usrLogged());
    this.loged=this.usrLogged;
    console.log(this.loged);
  }
}
