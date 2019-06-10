import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage.service';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss']
})                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
export class SidenavBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  
  private aux:Boolean;
  constructor(private breakpointObserver: BreakpointObserver,private storage : StorageService,private router: Router, private apiService : ApiServiceService) {
    this.storage.select$().subscribe(logueado=>{this.aux=logueado.valueOf();
     console.log('sidenv-Bar logueado***************************')
    console.log(logueado)});
    this.aux=this.storage.usrLogged();
    console.log('**************Sidenav-Bar-Logueado*****************');
    console.log(this.aux);
  }



  Usuario(){
    this.router.navigate(['/login']);
  }

  Visitante(){
    this.router.navigate(['/paginaPrincipal']);
  }

  Citizen(){
    this.router.navigate(['/loginRedSocial']);
  }

  gestionarMecanismosInternos(){  
    localStorage.setItem("funcion","gestionarMecanismosInternos");
    this.router.navigate(['/listarComponentes'])
  }

    gestionarMecanismosExternos(){  
    localStorage.setItem("funcion","gestionarMecanismosExternos");
    this.router.navigate(['/listarComponentes'])
  }

  crearUsuario(){
    this.router.navigate(['/crearUsuario']);
  }

  crearhecho(){
    this.router.navigate(['/crearHecho']);
  }

  listarHechosByChecker(){
    this.router.navigate(['/seleccionarHecho']);
  }

  gestionNodos(){
    this.router.navigate(['/gestionNodosPerifericos']);
  }

  asignarHecho(){
    this.router.navigate(['/hechos']);
  }

  listarMecanismos(){
    this.router.navigate(['/listarComponentes']);
  }

  suscripcion(){
    var aceptar;
    aceptar=confirm("Desea suscribirse a las notificaciones").valueOf();
    if(aceptar=true)
    {
      this.apiService.suscribirse().subscribe((res)=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      });
    }
  }

logOut(){
  this.storage.clearSession();
}

pruebaObs(){
  this.storage.pruebaObs();
}


}
