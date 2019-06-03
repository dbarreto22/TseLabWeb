import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-primer-pagina',
  templateUrl: './primer-pagina.component.html',
  styleUrls: ['./primer-pagina.component.scss']
})
export class PrimerPaginaComponent implements OnInit {


  constructor(private router: Router, private apiService : ApiServiceService) { }

  ngOnInit() {
    
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

}
