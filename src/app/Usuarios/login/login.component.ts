import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular-6-social-login';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private socialAuthService: AuthService , private router: Router, private apiservice : ApiServiceService) { }

  public nombre:string;
  public email :string;
  public passwordHash = require('password-hash');

  
  ngOnInit() {
  }


  login(mail, password ){
   
    var hashedPassword = this.passwordHash.generate(password);

    this.apiservice.loginUsuario(mail, hashedPassword).subscribe( result => {
          
      console.log(result);
  },
  error => {
      console.log(<any>error);
  });
}



}
