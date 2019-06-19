import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Usuarios/login/login.component';
import { LoginRedSocialComponent } from './Citizen/login-red-social/login-red-social.component';
import { PaginaPrincipalComponent } from './Citizen/pagina-principal/pagina-principal.component';
import { CrearUsuarioComponent } from './Usuarios/crear-usuario/crear-usuario.component';
import { PrimerPaginaComponent } from './primer-pagina/primer-pagina.component';
import { HechosComponent } from './Usuarios/hechos/hechos.component';
import { SeleccionarHechoCheckerComponent } from './Usuarios/seleccionar-hecho-checker/seleccionar-hecho-checker.component';
import { VerificarHechoComponent } from './Usuarios/verificar-hecho/verificar-hecho.component';
import { UsuariosComponent } from './Usuarios/usuarios/usuarios.component';
import { ListadoComponentesComponent } from './Usuarios/listado-componentes/listado-componentes.component';
import { MecanismosComponent } from './Usuarios/mecanismos/mecanismos.component';
import { CrearHechoComponent } from './Usuarios/crear-hecho/crear-hecho.component';
import { GestionNodosPerifericosComponent } from './Usuarios/gestion-nodos-perifericos/gestion-nodos-perifericos.component';
import { CrearNodosPerifericosComponent } from './Usuarios/crear-nodos-perifericos/crear-nodos-perifericos.component';
import { ModificarNodosPerifericosComponent } from './Usuarios/modificar-nodos-perifericos/modificar-nodos-perifericos.component';
import { AuthorizatedGuard } from './authorizated.guard';
import { GraficaComponent } from './Usuarios/grafica/grafica.component';
import { ExportPDFComponent } from './Usuarios/export-pdf/export-pdf.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { DonacionesComponent } from './Usuarios/donaciones/donaciones.component';
import { DonarComponent } from './Usuarios/donar/donar.component';
import { AppComponent } from './app.component';



const routes: Routes = [
  { path: '', component: PrimerPaginaComponent},
/*{ path: '', component: AppLayoutComponent, canActivate:[AuthorizatedGuard],
children:[*/  
  {path: 'crearUsuario', component: CrearUsuarioComponent, canActivate:[AuthorizatedGuard]},
  {path: 'hechos', component: HechosComponent, canActivate:[AuthorizatedGuard]},
  {path: 'seleccionarHecho', component: SeleccionarHechoCheckerComponent, canActivate:[AuthorizatedGuard]},   
  {path: 'verificarHecho', component: VerificarHechoComponent, canActivate:[AuthorizatedGuard]},
  {path: 'usuarios', component: UsuariosComponent, canActivate:[AuthorizatedGuard]},
  {path: 'listarComponentes', component: ListadoComponentesComponent, canActivate:[AuthorizatedGuard]},
  {path: 'mecanismos', component: MecanismosComponent, canActivate:[AuthorizatedGuard]},
  {path: 'crearHecho', component: CrearHechoComponent, canActivate:[AuthorizatedGuard]},
  {path: 'gestionNodosPerifericos', component: GestionNodosPerifericosComponent, canActivate:[AuthorizatedGuard]},
  {path: 'crearNodosPerifericos', component: CrearNodosPerifericosComponent, canActivate:[AuthorizatedGuard]},
  {path: 'modificarNodosPerifericos', component: ModificarNodosPerifericosComponent, canActivate:[AuthorizatedGuard]},
  {path: 'reportes', component: ExportPDFComponent, canActivate:[AuthorizatedGuard]},
  {path: 'graficas', component: GraficaComponent, canActivate:[AuthorizatedGuard]},
  {path: 'principalAdmin', component: PaginaPrincipalComponent, canActivate:[AuthorizatedGuard]},
  {path: 'listarDonaciones', component: DonacionesComponent, canActivate:[AuthorizatedGuard]},
  {path: 'donar', component: DonarComponent}
/*],
   
}*/,
{ path: 'login', component: LoginComponent},
{path: 'loginRedSocial', component: LoginRedSocialComponent},
{ path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
