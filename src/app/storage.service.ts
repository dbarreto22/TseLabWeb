import { Injectable } from '@angular/core';
import { Sesion } from './Usuarios/clases/sesion.model';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class StorageService {

  private loged;
  private loged$=new BehaviorSubject<Boolean>(this.usrLogged());
  private rol;
  private rol$=new BehaviorSubject<String>('');
  public select$():Observable<Boolean>{ 
    return this.loged$.asObservable();
  }

  public roles$():Observable<String>{ 
    return this.rol$.asObservable();
  }

  constructor(private http: HttpClient) { 
    this.loged=this.usrLogged();
  }

  setSession(sesion, usuario){
    localStorage.setItem('session',JSON.stringify(new Sesion(sesion,usuario)));
    console.log('Storage- setseesion next*************************');
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
    return localStorage.getItem('session')!=null && localStorage.getItem('session')!=''  ? true : false;
  }

  clearSession(){
    localStorage.clear();
    this.obs();
  }
  
  obs(){
    this.loged$.next(this.usrLogged());
    this.loged=this.usrLogged;
    console.log(this.loged());
  }

  pruebaObs(){  // esto funcionaba con los observables
    console.log(localStorage.getItem('rol'));
  }

  setRol(aux){
    this.rol$.next(aux);
    this.rol=aux;
    localStorage.setItem('rol',aux);
    console.log('Storage-setRol-Rol*******************');
    console.log(this.rol);
  }

  getAllHechos()//: Observable<Array<object>> {
  { 
    var a: any = {};
    a.transaccionid='DesdeConsola3';
    a.fecha='10-06-2019T16:00';
    a.monto='4';
    a.moneda='USD';
    a.usuario='consola';
    let json=JSON.stringify(a);
    return this.http.post(`http://98fefa78.ngrok.io/donacion`,json);
    /*
    var sesion: Sesion = JSON.parse(localStorage.getItem('session'));
    console.log('****************Token**********************')
    console.log(sesion.token.jwt);
    return this.http.get<Array<object>>(`${this.API_URL}/getHechos`);*/

    
  }
}
