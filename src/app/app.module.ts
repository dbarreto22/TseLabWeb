import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatTabsModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiServiceService } from './api-service.service';
import {APP_BASE_HREF} from '@angular/common';
import { LoginComponent } from './Usuarios/login/login.component';
// MDB Angular Free
import {  MDBBootstrapModule, MdbCardHeaderComponent } from 'angular-bootstrap-md'
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
  LinkedinLoginProvider,
} from "angular-6-social-login-v2";


import { CrearUsuarioComponent } from './Usuarios/crear-usuario/crear-usuario.component';
import { PrimerPaginaComponent } from './primer-pagina/primer-pagina.component';
import { PaginaPrincipalComponent } from './Citizen/pagina-principal/pagina-principal.component';
import { LoginRedSocialComponent } from './Citizen/login-red-social/login-red-social.component';
import { HechosComponent } from './Usuarios/hechos/hechos.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';  
import { VerificarHechoComponent } from './Usuarios/verificar-hecho/verificar-hecho.component';
import {NgbModule, NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { SeleccionarHechoCheckerComponent } from './Usuarios/seleccionar-hecho-checker/seleccionar-hecho-checker.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './Usuarios/usuarios/usuarios.component';
import { ListadoComponentesComponent } from './Usuarios/listado-componentes/listado-componentes.component'
import { AuthenticationService } from './authentication.service';
import { MecanismosComponent } from './Usuarios/mecanismos/mecanismos.component';
import { CrearHechoComponent } from './Usuarios/crear-hecho/crear-hecho.component';
import { GestionNodosPerifericosComponent } from './Usuarios/gestion-nodos-perifericos/gestion-nodos-perifericos.component';
import { CrearNodosPerifericosComponent } from './Usuarios/crear-nodos-perifericos/crear-nodos-perifericos.component';
import { ModificarNodosPerifericosComponent } from './Usuarios/modificar-nodos-perifericos/modificar-nodos-perifericos.component';
import { DonacionesComponent } from './Usuarios/donaciones/donaciones.component';
import { DonarComponent } from './Usuarios/donar/donar.component';
import { SidenavBarComponent } from './sidenav-bar/sidenav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthorizatedGuard } from './authorizated.guard';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { GraficaComponent } from './Usuarios/grafica/grafica.component';
import { ExportPDFComponent } from './Usuarios/export-pdf/export-pdf.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';







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
    CrearUsuarioComponent,
    PrimerPaginaComponent,
    LoginRedSocialComponent,
    HechosComponent,
    VerificarHechoComponent,
    SeleccionarHechoCheckerComponent,
    UsuariosComponent,
    ListadoComponentesComponent,
    MecanismosComponent,
    CrearHechoComponent,
    GestionNodosPerifericosComponent,
    CrearNodosPerifericosComponent,
    ModificarNodosPerifericosComponent,
    DonacionesComponent,
    DonarComponent,
    SidenavBarComponent,
    GraficaComponent,
    ExportPDFComponent,
    AppLayoutComponent,
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
    NgbModule,NgbPaginationModule, NgbAlertModule,
    ButtonsModule,
    DateInputsModule,
    DropDownsModule,
    FormsModule,
    LayoutModule,
    PDFExportModule,
    ChartsModule
  ],
  providers: [
              
              ApiServiceService,
              HttpClient,
              HttpClientModule,
              AuthenticationService,
              AuthorizatedGuard,
              {
                provide: AuthServiceConfig,
                useFactory: getAuthServiceConfigs
              },
              {
                provide: HTTP_INTERCEPTORS,
                useClass: ApiServiceService,
                multi: true
              },

            ],
  bootstrap: [AppComponent],
  exports: [MatTabsModule, MatSidenavModule,MatIconModule, MatButtonModule,MatListModule,
    HttpClientModule
  ],

})
export class AppModule { }
export class PizzaPartyAppModule { }
