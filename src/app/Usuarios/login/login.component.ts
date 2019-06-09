import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Sesion } from '../clases/sesion.model';
import { ApiServiceService } from 'src/app/api-service.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ ApiServiceService,StorageService]
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private apiservice : AuthenticationService,private storage : StorageService) { }

  public nombre:string;
  public email :string;

  

  
  ngOnInit() {
  }


  login(mail, password ){
   
    var crypto = require('crypto'); //Libreria de criptografia
    var cipher = crypto.createCipher('aes256', 'pass'); // tipo de cifrado y password
    var data = password;
    cipher.update(data, 'utf8', 'hex'); // cifro la contraseña
    var cip = cipher.final('hex'); //Cifrado
    console.log("Encrypted data = " + cip);

    //Descomentar la siguiente linea para pasar la pass cifrada
      this.apiservice.loginUsuario(mail, cip).subscribe( result => {
    //this.apiservice.loginUsuario(mail, password).subscribe( result => {
      localStorage.setItem('userMail',mail);
      var resultado=JSON.parse(result);
      //localStorage.setItem('session',JSON.stringify(new Sesion(res,null)));
      if(resultado.jwt!= null)
      {
        this.storage.setSession(resultado,null);
      }
      console.log("******************** resultado de login*******************************");
      console.log(resultado);
  },
  error => {
      console.log(<any>error);
  });
}



}
