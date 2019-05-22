import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from './api-service.service';
import {APP_BASE_HREF} from '@angular/common';
import { LoginComponent } from './Usuarios/login/login.component';
// MDB Angular Free
import { ButtonsModule, InputsModule, MDBBootstrapModule, MdbCardHeaderComponent } from 'angular-bootstrap-md'
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
} from "angular-6-social-login";

import { GestionComponenetesComponent } from './Usuarios/gestion-componenetes/gestion-componenetes.component';
import { AbmUsuariosComponent } from './Usuarios/abm-usuarios/abm-usuarios.component';
import { CrearUsuarioComponent } from './Usuarios/crear-usuario/crear-usuario.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { NgxSoapModule } from 'ngx-soap';
import { PrimerPaginaComponent } from './primer-pagina/primer-pagina.component';
import { PaginaPrincipalComponent } from './Citizen/pagina-principal/pagina-principal.component';
import { LoginRedSocialComponent } from './Citizen/login-red-social/login-red-social.component';


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("394619593687-su98khfbl5k7300dhd3a924r1bgtr33v.apps.googleusercontent.com")
        },
          {
            id: LinkedinLoginProvider.PROVIDER_ID,
            provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
          },
      ]);
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaginaPrincipalComponent,
    GestionComponenetesComponent,
    AbmUsuariosComponent,
    CrearUsuarioComponent,
    PrimerPaginaComponent,
    LoginRedSocialComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    SocialLoginModule,
    ButtonsModule, 
    InputsModule, 
    MDBBootstrapModule, GridModule,
    NgxSoapModule
  ],
  providers: [
              
              ApiServiceService,
              {
                provide: AuthServiceConfig,
                useFactory: getAuthServiceConfigs
              }
            
            ],
  bootstrap: [AppComponent],
  exports: [MatTabsModule, MatSidenavModule,MatIconModule, MatButtonModule,MatListModule,
    HttpClientModule
  ],

})
export class AppModule { }
