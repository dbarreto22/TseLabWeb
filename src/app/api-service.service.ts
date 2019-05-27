import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sesion } from './Usuarios/clases/sesion.model';


const httpOptions: {
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

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  api_key = '593353109d5846fa8188a9de013e4faa';

  API_URL = 'https://r179-27-99-70.ir-static.anteldata.net.uy:8443/FakeNews-web/RESTServices'

  constructor(private http: HttpClient) { }

  initSources() {
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.api_key);
  }
  initArticles() {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.api_key);
  }
  getArticlesByID(source: String) {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.api_key);
  }
/*
  loginUsuario(email, password) {
    var a: any = {};
    a.password = password;
    let json = JSON.stringify(a);
    a.username = email;
    console.log(json);

    return this.http.post(`${this.API_URL}/backend/login`, json);
  }

  loginCitizen(email, token) {
    var a: any = {};
    a.mail = email;
    a.token_id = token;
    let json = JSON.stringify(a);
    console.log(json);

    return this.http.post(`${this.API_URL}/citizen/login`, json, httpOptions);
  }
*/
  prueba(): Observable<any> {
    return this.http.get<any>('https://r179-27-99-70.ir-static.anteldata.net.uy:8443/FakeNews-web/RESTServices/prueba');
  }

  getAllHechos(): Observable<Array<object>> {
    var sesion: Sesion = JSON.parse(localStorage.getItem('session'));
    console.log('****************Token**********************')
    console.log(sesion.token.jwt);
    /* var hechos;
     var hecho;
     hecho.id=1;
     hecho.titulo="algo";
     hecho.subbmiter="pedro";
     hecho.url="www.com.uy";
     hecho.usuarioAlta="pepe";
     hechos.push(hecho);
     //return hechos;*/
    return this.http.get<Array<object>>('https://r179-27-99-70.ir-static.anteldata.net.uy:8443/FakeNews-web/RESTServices/getHechos');
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
}
