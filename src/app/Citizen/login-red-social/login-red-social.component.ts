import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Sesion } from '../../Usuarios/clases/sesion.model';

@Component({
  selector: 'app-login-red-social',
  templateUrl: './login-red-social.component.html',
  styleUrls: ['./login-red-social.component.scss']
})
export class LoginRedSocialComponent implements OnInit {

  constructor( private socialAuthService: AuthService , private router: Router, private apiservice:AuthenticationService) { }


  ngOnInit() {
  }
  public socialSignIn(socialPlatform : string) {
    console.log(socialPlatform);
    let socialPlatformProvider;
     if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        localStorage.setItem('userMail',userData.email);
        this.apiservice.loginCitizen( userData.email,userData.idToken).subscribe( result => {
          var resultado=JSON.parse(result);
          //localStorage.setItem('session',JSON.stringify(new Sesion(res,null)));
          if(resultado.jwt!= null)
          {
            localStorage.setItem('session',JSON.stringify(new Sesion(resultado,null)));
          }
          console.log("******************** resultado de login por red social*******************************");
          console.log(resultado);
      },
      error => {
          console.log(<any>error);
      });
            
      }
    );
  }

  loginGoogle(){
   

    
  
  }



}
