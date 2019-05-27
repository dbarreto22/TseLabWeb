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
export class AuthenticationService {

  api_key = '593353109d5846fa8188a9de013e4faa';
  API_URL = 'https://r179-27-99-70.ir-static.anteldata.net.uy:8443/FakeNews-web/RESTServices'

  constructor(private http: HttpClient) { }

  loginUsuario(email, password) {
    var a: any = {};
    a.password = password;
    a.username = email;
    let json = JSON.stringify(a);
    console.log(json);

    return this.http.post(`${this.API_URL}/backend/login`, json, httpOptions);
  }

  loginCitizen(email, token) {
    var a: any = {};
    a.mail = email;
    a.token_id = token;
    let json = JSON.stringify(a);
    console.log(json);

    return this.http.post(`${this.API_URL}/citizen/login`, json, httpOptions);
  }

}
