import { Injectable } from '@angular/core';
import { Sesion } from './Usuarios/clases/sesion.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setSession(sesion, usuario){
    localStorage.setItem('session',JSON.stringify(new Sesion(sesion,usuario)));
    console.log('Se guardo la sesión*************************');
    console.log(sesion);
  }

  getSession()
  {
    return localStorage.getItem('session');
  }
  usrLogged()
  {
    return localStorage.getItem('session')!=null ? true : false;
  }
}
