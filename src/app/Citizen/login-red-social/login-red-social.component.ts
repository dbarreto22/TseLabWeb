import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, LinkedinLoginProvider } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-login-red-social',
  templateUrl: './login-red-social.component.html',
  styleUrls: ['./login-red-social.component.scss']
})
export class LoginRedSocialComponent implements OnInit {

  constructor( private socialAuthService: AuthService , private router: Router, private apiservice:ApiServiceService) { }


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
        this.apiservice.loginCitizen( userData.email,userData.idToken).subscribe( result => {
          
          console.log(result);
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
