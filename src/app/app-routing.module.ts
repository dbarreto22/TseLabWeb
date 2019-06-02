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
import { CrearHechoComponent } from './Usuarios/crear-hecho/crear-hecho.component';
import { GestionNodosPerifericosComponent } from './Usuarios/gestion-nodos-perifericos/gestion-nodos-perifericos.component';
import { CrearNodosPerifericosComponent } from './Usuarios/crear-nodos-perifericos/crear-nodos-perifericos.component';
import { ModificarNodosPerifericosComponent } from './Usuarios/modificar-nodos-perifericos/modificar-nodos-perifericos.component';


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
  {path: 'listarComponentes', component: ListadoComponentesComponent},
  {path: 'crearHecho', component: CrearHechoComponent},
  {path: 'gestionNodosPerifericos', component: GestionNodosPerifericosComponent},
  {path: 'crearNodosPerifericos', component: CrearNodosPerifericosComponent},
  {path: 'modificarNodosPerifericos', component: ModificarNodosPerifericosComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
