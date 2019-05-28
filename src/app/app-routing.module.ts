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


const routes: Routes = [
      
  {path: '', component:PrimerPaginaComponent},
  {path: 'paginaPrincipal', component:PaginaPrincipalComponent},
  {path: 'login', component: LoginComponent},   
  {path: 'loginRedSocial', component: LoginRedSocialComponent},
  {path: 'crearUsuario', component: CrearUsuarioComponent},
  {path: 'hechos', component: HechosComponent},
  {path: 'seleccionarHecho', component: SeleccionarHechoCheckerComponent},   
  {path: 'verificarHecho', component: VerificarHechoComponent},
  {path: 'usuarios', component: UsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
