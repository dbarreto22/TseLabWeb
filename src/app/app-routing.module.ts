import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Usuarios/login/login.component';
import { PaginaPrincipalComponent } from './Citizen/pagina-principal/pagina-principal.component';
import { CrearUsuarioComponent } from './Usuarios/crear-usuario/crear-usuario.component';
import { PrimerPaginaComponent } from './primer-pagina/primer-pagina.component';

const routes: Routes = [
      
  {path: '', component:PrimerPaginaComponent},
  {path: 'paginaPrincipal', component:PaginaPrincipalComponent},
  {path: 'login', component: LoginComponent},   
  {path: 'loginRedSocial', component: LoginComponent},
  {path: 'crearUsuario', component: CrearUsuarioComponent},   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


  



}
