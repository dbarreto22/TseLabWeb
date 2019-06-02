import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sesion } from './Usuarios/clases/sesion.model';
import { Hechos } from './Usuarios/clases/hechos';
import { Admin } from './Usuarios/clases/admin';
import { Usuario } from './Usuarios/clases/usuario';
import { Submiter } from './Usuarios/clases/submiter';
import { Checker } from './Usuarios/clases/checker';
import { observe } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Mecanismos } from './Usuarios/clases/mecanismos';
import { Perifericos } from './Usuarios/clases/perifericos';


const httpOptions:{
  headers?: HttpHeaders,
  observe?: 'body',
  params?: HttpParams,
  reportProgress?: boolean,
  responseType: 'text',
  withCredentials?: boolean

} = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};

const mailUser = new HttpParams().append('mail', localStorage.getItem("userMail"));
const headersget= new HttpHeaders({'Content-Type': 'application/json'});
//headersget.append('Content-Type': 'application/json');

//const options = new httpOptions({headers: new Headers({'Content-Type': 'application/json'}), params:mailUser});

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  api_key = '593353109d5846fa8188a9de013e4faa';

  API_URL = 'https://r179-27-99-70.ir-static.anteldata.net.uy:8443/FakeNews-web/RESTServices'

  constructor(private http: HttpClient) { }
x

  getAllHechos(): Observable<Array<object>> {
    var sesion: Sesion = JSON.parse(localStorage.getItem('session'));
    console.log('****************Token**********************')
    console.log(sesion.token.jwt);
    return this.http.get<Array<object>>(`${this.API_URL}/getHechos`);
  }

  getHechosByChecker(): Observable<Array<object>> { 
   // { headers:headersget, params:mailUser}
    
    let mail=localStorage.getItem("mailUsuario");;
    
    return this.http.get<Array<object>>(`${this.API_URL}/getHechosByChecker` + mail);
  }

  getAllUsuarios(): Observable<Array<object>> {
    var sesion: Sesion = JSON.parse(localStorage.getItem('session'));
    console.log('****************Token**********************')
    console.log(sesion.token.jwt);
    return this.http.get<Array<object>>(`${this.API_URL}/getHechos`);
  }

  getAllMecanismos(): Observable<Array<object>> {

    return this.http.get<Array<object>>(`${this.API_URL}/backend/getMecanismosVerificacion`);
  }

  getCheckers(): Observable<Array<object>> {
    return this.http.get<Array<object>>(`${this.API_URL}/backend/getCheckers`);
}

getNodosPerifericos(): Observable<Array<object>> {
  
  return this.http.get<Array<object>>(`${this.API_URL}/admin/getNodosPerifericos`);
}

  asignarUsuario(){
    var idHecho=localStorage.getItem("idHecho");
    var mailUsuario=localStorage.getItem("mailUsuario");
    var a: any = {};
    a.idHecho=idHecho;
    a.mail=mailUsuario;
    let json=JSON.stringify(a);
    return this.http.post(`${this.API_URL}/submitter/asignarHecho`,json,httpOptions);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({                                                                         
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    return next.handle(request);
  }

  public getToken() {
    var sesion: Sesion = JSON.parse(localStorage.getItem('session'));
    console.log(sesion);
    return sesion != null ? sesion.token.jwt : null;
  }


  calificarHecho(hecho: Hechos){
    return this.http.post(`${this.API_URL}/checker/verificarHecho` , hecho, httpOptions);
  }

  altaMecanismo(descripcion,url)
  {
    var a: any = {};
    a.usuario="";
    a.password="";
    a.descripcion=descripcion;
    a.url=url;
    a.habilitado="true";
    a.tipomecanismo="INTERNO";
    let json=JSON.stringify(a);
    return this.http.post(`${this.API_URL}/`,json,httpOptions);    
  }

  modificarMecanismo(id,descripcion,url,habilitado)
  {
    var a: any = {};
    a.id=id;
    a.descripcion=descripcion;
    a.url=url;
    a.habilitado=habilitado;
    a.usuario="";
    a.password="";
    let json=JSON.stringify(a);
    return this.http.post(`${this.API_URL}/`,json,httpOptions);    
  }

  crearUser(usuario:Usuario){
   
    return this.http.post(`${this.API_URL}/backend/registro` , usuario, httpOptions);
  }
//ACTUALIZAR URL
verificarHechoMecanismoSinApi(idMecanismo, idHecho){

    var a: any = {};
    a.idHecho=idHecho;
    a.idMecanismoVerificacion=idMecanismo;
    let json=JSON.stringify(a);


  return this.http.post(`${this.API_URL}/checker/verificarHechoMecanismo` , json, httpOptions);
}

verificarHechoMecanismoConApi(idMecanismo, idHecho, calificacion){
 
  var a: any = {};
  a.idHecho=idHecho;
  a.idMecanismo=idMecanismo;
  a.calificacion = calificacion;
  let json=JSON.stringify(a);


return this.http.post(`${this.API_URL}/checker/verificarHechoMecanismo` , json, httpOptions);
}



crearhecho(titulo: string,url :string){
  var a: any = {};
  a.titulo=titulo;
  a.url=url;
  let json=JSON.stringify(a);


  return this.http.post(`${this.API_URL}/citizen/addHecho` , json, httpOptions);
}


crearMecanismoVerificacion(mec:Perifericos, tipoMecanismo:string){
  var a: any = {};
  a.tipoMecanismo=tipoMecanismo;
  //a.url=url;
  let json=JSON.stringify(a);


  return this.http.post(`${this.API_URL}/admin/addMecanismoVerificacion` , {mec ,json}, httpOptions);
}


}
