import { Component, OnInit } from '@angular/core';
import { 
  AuthService,
  GoogleLoginProvider,
  LinkedinLoginProvider,
  SocialLoginModule,
 } from 'angular-6-social-login-v2';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';


@Component({
  selector: 'app-login-red-social',
  templateUrl: './login-red-social.component.html',
  styleUrls: ['./login-red-social.component.scss'],
  providers: [SocialLoginModule, AuthService]
})
export class LoginRedSocialComponent implements OnInit {


  public socialPlatformProvider;
  constructor( private socialAuthService: AuthService , private router: Router, private apiservice:ApiServiceService) { }


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

        this.apiservice.loginCitizen( userData.email,userData.idToken).subscribe( result => {
          
          console.log(result);
      },
      error => {
          console.log(<any>error);
      });
            
      }
    );
  }


  


}
