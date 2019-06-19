import { Component, OnInit } from '@angular/core';
import { 
  AuthService,
  GoogleLoginProvider,
  LinkedinLoginProvider,
  SocialLoginModule,
 } from 'angular-6-social-login-v2';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Sesion } from '../../Usuarios/clases/sesion.model';
import { StorageService } from 'src/app/storage.service';


@Component({
  selector: 'app-login-red-social',
  templateUrl: './login-red-social.component.html',
  styleUrls: ['./login-red-social.component.scss'],
  providers: [SocialLoginModule, AuthService]
})
export class LoginRedSocialComponent implements OnInit {

  public socialPlatformProvider;
  constructor( private storage:StorageService, private socialAuthService: AuthService ,
     private router: Router, private apiservice:AuthenticationService) { }



  ngOnInit() {
  }
  public socialSignIn(socialPlatform : string) {
    console.log(socialPlatform);
   
     if(socialPlatform == "google"){
      this.socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "linkedin") {
      this.socialPlatformProvider = LinkedinLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(this.socialPlatformProvider).then(
      
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        localStorage.setItem('userMail',userData.email);
        this.apiservice.loginCitizen( userData.email,userData.idToken).subscribe( result => {
          var resultado=JSON.parse(result);
          //localStorage.setItem('session',JSON.stringify(new Sesion(res,null)));
          if(resultado.jwt!= null)
          {
            this.storage.setSession(resultado,null);
            this.storage.setRol(resultado.rol);
          }
          console.log("******************** resultado de login por red social*******************************");
          console.log(resultado);
      },
      error => {
          console.log(<any>error);
      });
      }
    );
    this.router.navigate(['/bienvenido']);
  }

}
