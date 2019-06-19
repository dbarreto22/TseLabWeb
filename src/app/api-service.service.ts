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
//    /*
    var sesion: Sesion = JSON.parse(localStorage.getItem('session'));
    console.log('****************Token**********************')
    console.log(sesion != null ? sesion.token.jwt : "No estas logueado");
    return this.http.get<Array<object>>(`${this.API_URL}/getHechos`);//*/
  }

  getHechosVisitante(){
    return this.http.get<Array<object>>(`${this.API_URL}/getHechos`);//*/
  }

  getHechosByChecker(): Observable<Array<object>> { 
   // { headers:headersget, params:mailUser}
    
    let mail=localStorage.getItem("userMail");;
    
    return this.http.get<Array<object>>(`${this.API_URL}/getHechosByChecker/` + mail);
  }

  getAllUsuarios(): Observable<Array<object>> {
    var sesion: Sesion = JSON.parse(localStorage.getItem('session'));
    console.log('****************Token**********************')
    console.log(sesion != null ? sesion.token.jwt : "No estas logueado");
    return this.http.get<Array<object>>(`${this.API_URL}/getHechos`);
  }
/*
  getAllMecanismos(): Observable<Array<object>> {

    return this.http.get<Array<object>>(`${this.API_URL}/backend/getMecanismosVerificacion`);
  }
*/
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


  calificarHecho(id, calificacion, justificacion){
    var a: any = {};
    a.id=id;
    a.calificacion=calificacion;
    a.justificacion=justificacion;
    let json=JSON.stringify(a);
    return this.http.post(`${this.API_URL}/checker/verificarHecho` , json, httpOptions);
  }

  altaMecanismo(descripcion,url,tipoMecanismo)
  {
    var a: any = {};
    a.usuario="";
    a.password="";
    a.descripcion=descripcion;
    a.url=url;
    a.habilitado="true";
    a.mecanismo=tipoMecanismo;
    let json=JSON.stringify(a);
    return this.http.post(`${this.API_URL}/admin/addMecanismoVerificacion`,json,httpOptions);    
  }

  modificarMecanismo(id,descripcion,url,habilitado,tipoMecanismo)
  {
    var a: any = {};
    a.id=id;
    a.descripcion=descripcion;
    a.url=url;
    a.habilitado=habilitado;
    a.usuario="";
    a.password="";
    a.mecanismo=tipoMecanismo;
    let json=JSON.stringify(a);
    return this.http.post(`${this.API_URL}/admin/modificarMecanismoVerificacion`,json,httpOptions);    
  }
  crearUser(usuario:Usuario){
   
    return this.http.post(`${this.API_URL}/backend/registro` , usuario, httpOptions);
  }

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


suscribirse()
{
  var mail = localStorage.getItem('userMail');
  var a: any = {};
  a=JSON.stringify(mail);
  return this.http.post(`${this.API_URL}/citizen/suscripcion` , a, httpOptions);
}




crearhecho(titulo: string,url :string){
  var a: any = {};
  a.titulo=titulo;
  a.url=url;
  let json=JSON.stringify(a);
  return this.http.post(`${this.API_URL}/citizen/addHecho` , json, httpOptions);
}


crearMecanismoVerificacionPeriferico(mec:Perifericos){
  var a: any = {};
  a.MecanismoVerificacion=mec;
  let json=JSON.stringify(a);
  return this.http.post(`${this.API_URL}/admin/addMecanismoVerificacion` , mec, httpOptions);
}

modificarMecanismoVerificacionPeriferico(mec:Perifericos){
  var a: any = {};
  a.MecanismoVerificacion=mec;
  let json=JSON.stringify(a);
  return this.http.post(`${this.API_URL}/admin/modificarMecanismoVerificacion`, mec, httpOptions);
  
}

getMecanismosInternos(): Observable<Array<object>> {

  return this.http.get<Array<object>>(`${this.API_URL}/backend/getMecanismosInternos`);
}

getMecanismosExternos(): Observable<Array<object>> {

  return this.http.get<Array<object>>(`${this.API_URL}/backend/getMecanismosExternos`);
}


gethechosByEstados(estado :string){
  console.log("ESTADO",estado)
 // let estado = "VERIFICADO"
  return this.http.get<Array<object>>(`${this.API_URL}/getHechosByEstado/` + estado);
}


gethechospaginado(nroPag, cantElemPag): Observable<object> {
  
  return this.http.get<object>(`${this.API_URL}/getHechosPag/` + nroPag + `/` + cantElemPag );
}



getFiltros(nroPag, cantElemPag, titulo, url, estado): Observable<object> {
  
  return this.http.get<object>(`${this.API_URL}/getHechosFiltros/` + nroPag + `/` + cantElemPag + `/` + titulo + `/` + url + `/` + estado);
}

registrardonacion(id,time,monto,usuario,moneda){
  var a: any = {};
  a.transaccionId=id;
  a.fecha = time;
  a.monto = monto;
  a.moneda = moneda;
  a.usuario = usuario;
  let json=JSON.stringify(a);
  return this.http.post(`http://e499ed4c.ngrok.io/donacion`, json, httpOptions);
}

getAllDonaciones(): Observable<Array<object>> {
  return this.http.get<Array<object>>(`http://e499ed4c.ngrok.io/donacion/getAll`);
}

getTotalHechosPorEstado(): Observable<object>{
  
  return this.http.get<object>(`${this.API_URL}/getCantHechosPorEstado`);

}

gethechoById(id : string):Observable<object>{
  return this.http.get<object>(`${this.API_URL}/getHechoById/` + id);
}

}
