import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Sesion } from '../clases/sesion.model';
import { ApiServiceService } from 'src/app/api-service.service';
import { StorageService } from 'src/app/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ ApiServiceService]
})
export class LoginComponent implements OnInit {

  constructor( private router: Router, private apiservice : AuthenticationService,private storage : StorageService) { 
  }

  public nombre:string;
  public email :string;
  

  
  ngOnInit() {

    if(this.storage.usrLogged())
      this.router.navigate(['/']);
  }


  login(mail, password ){
   
    var crypto = require('crypto'); //Libreria de criptografia
    var cipher = crypto.createCipher('aes256', 'pass'); // tipo de cifrado y password
    var data = password;
    cipher.update(data, 'utf8', 'hex'); // cifro la contraseña
    var cip = cipher.final('hex'); //Cifrado
    console.log("Encrypted data = " + cip);
      this.apiservice.loginUsuario(mail, cip).subscribe( result => {
      localStorage.setItem('userMail',mail);
      var resultado=JSON.parse(result);
      if(resultado.jwt!= null   && resultado.jwt!= "")
      {
        this.storage.setSession(resultado,null);
        this.storage.setRol(resultado.rol);
      }
      else
        alert('Usuario o contraseña incorrectos');
      if(this.storage.getSession)
        this.router.navigate(['/']);
  },
  error => {
      console.log(<any>error);
  });
}

}
