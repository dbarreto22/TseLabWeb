import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http:HttpClient) { }

/*  initSources(){
     return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key);
  }
  initArticles(){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key);
  }
  getArticlesByID(source: String){
   return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
  }*/

  loginUsuario(email , password){
    var a: any = {};
    a.username = email;
    a.password = password;
    let json = JSON.stringify(a);
    console.log(json);

    return this.http.post(`${this.API_URL}/backend/login` , json, httpOptions);
  }

  loginCitizen(email , token){
    var a: any = {};
    a.mail = email;
    a.token_id = token;
    let json = JSON.stringify(a);
    console.log(json);

    return this.http.post(`${this.API_URL}/citizen/login` , json, httpOptions);
  }

 /* prueba():Observable<any>{
    return this.http.get<any>('https://r179-27-99-70.ir-static.anteldata.net.uy:8443/FakeNews-web/RESTServices/prueba');
  }*/
} 

