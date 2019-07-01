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
  private loged$ = new BehaviorSubject<Boolean>(this.usrLogged());
  private rol;
  private rol$ = new BehaviorSubject<String>('');
  private funcion;
  private funcion$ = new BehaviorSubject<String>('');
  public select$(): Observable<Boolean> {
    return this.loged$.asObservable();
  }

  public roles$(): Observable<String> {
    return this.rol$.asObservable();
  }

  public funciones$(): Observable<String> {
    return this.funcion$.asObservable();
  }

  constructor(private http: HttpClient) {
    this.loged = this.usrLogged();
  }

  setSession(sesion, usuario) {
    localStorage.setItem('session', JSON.stringify(new Sesion(sesion, usuario)));
    console.log('Storage- setseesion next*************************');
    console.log(sesion);
    this.obs();
  }

  getSession() {
    return localStorage.getItem('session');
  }

  usrLogged() {
    console.log('Storage - usrLogged');
    console.log(localStorage.getItem('session'));
    return localStorage.getItem('session') != null && localStorage.getItem('session') != '' ? true : false;
  }

  clearSession() {
    localStorage.clear();
    this.obs();
  }

  obs() {
    this.loged$.next(this.usrLogged());
    this.loged = this.usrLogged;
    console.log(this.loged());
  }

  pruebaObs() {  // esto funcionaba con los observables
    console.log(localStorage.getItem('rol'));
  }

  setRol(aux) {
    this.rol$.next(aux);
    this.rol = aux;
    aux != null ? localStorage.setItem('rol', aux) : null;
    console.log('Storage-setRol-Rol*******************');
    console.log(this.rol);
  }

  getAllHechos()//: Observable<Array<object>> {
  {
    var a: any = {};
    a.transaccionid = 'DesdeConsola3';
    a.fecha = '10-06-2019T16:00';
    a.monto = '4';
    a.moneda = 'USD';
    a.usuario = 'consola';
    let json = JSON.stringify(a);
    return this.http.post(`http://98fefa78.ngrok.io/donacion`, json);

  }

  setFuncion(func) {
    this.funcion$.next(func);
    this.funcion = func;
    localStorage.setItem('funcion', func);
    console.log('****************Storage--Funcion--');
    console.log(func);
  }

  hayError(texto): boolean {
    var a = JSON.parse(texto);
    if (a != null && a.resultado == "OK") {
      alert(a.mensaje);
      return false;
    }
    else {
      alert('Ha habido un error, vuelva a intentarlo más tarde')
      return true;
    }
  }
  manejarError(obj) {
    alert('Su sesión ha caducado');
    if (obj.status == 403) {
      this.clearSession();
      this.usrLogged();
    }
    else
      alert('ha habido un error vuelva a intentarlo mas tarde');
  }
}
