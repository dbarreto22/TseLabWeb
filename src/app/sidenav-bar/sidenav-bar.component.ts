import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage.service';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav-bar',
  templateUrl: './sidenav-bar.component.html',
  styleUrls: ['./sidenav-bar.component.scss']
})
export class SidenavBarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  private rolElegido: String;
  private admin: Boolean = false;
  private checker: Boolean = false;
  private submiter: Boolean = false;
  private citizen: boolean = false;
  private aux: Boolean;
  private aux2: Boolean;
  private sidenav:MatSidenav;
  constructor(private breakpointObserver: BreakpointObserver, private storage: StorageService, private router: Router, private apiService: ApiServiceService) {
    this.storage.select$().subscribe(logueado => {
    this.aux = logueado.valueOf();
      this.aux2 = !this.aux;
      console.log('sidenv-Bar logueado***************************')
      console.log(logueado)
    });
    this.aux = this.storage.usrLogged();
    console.log('**************Sidenav-Bar-Logueado*****************');
    console.log(this.aux);

    this.storage.roles$().subscribe(rol => {
      if (rol != null && rol != "") {
        this.rolElegido = rol.valueOf();
        console.log('sidenv-Bar rol***************************')
        console.log(rol)
        if (rol == 'ADMIN')
          this.admin = true;
        else if (rol == 'SUBMITER')
          this.submiter = true;
        else if (rol == 'CHECKER')
          this.checker = true;
        else if (rol == 'CITIZEN')
          this.citizen = true;
      }
    });
  }

  ngOnInit() {

    this.storage.setRol(localStorage.getItem('rol'));

  }


  Usuario() {
    console.log('****************************Esto funca');
    this.router.navigate(['/crearUsuario']);
  }

  Visitante() {
    this.router.navigate(['/paginaPrincipal']);
  }

  Citizen() {
    this.router.navigate(['/loginRedSocial']);
  }

  gestionarMecanismosInternos() {
    localStorage.setItem("funcion", "gestionarMecanismosInternos");
    this.router.navigate(['/listarComponentes'])
  }

  gestionarMecanismosExternos() {
    localStorage.setItem("funcion", "gestionarMecanismosExternos");
    this.router.navigate(['/listarComponentes'])
  }

  crearUsuario() {
    this.router.navigate(['/crearUsuario']);
  }

  crearhecho() {
    this.router.navigate(['/crearHecho']);
  }

  listarHechosByChecker() {
    this.router.navigate(['/seleccionarHecho']);
  }

  gestionNodos() {
    this.router.navigate(['/gestionNodosPerifericos']);
  }

  asignarHecho() {
    this.router.navigate(['/hechos']);
  }

  listarDonaciones(){
    this.router.navigate(['/listarDonaciones']);
  }

  listarMecanismos() {
    this.router.navigate(['/listarComponentes']);
  }

  suscripcion() {
    var aceptar;
    aceptar = confirm("Desea suscribirse a las notificaciones").valueOf();
    if (aceptar = true) {
      this.apiService.suscribirse().subscribe((res) => {
        console.log(res);
      },
        err => {
          console.log(err);
        });
    }
  }

  logOut() {
    this.storage.clearSession();
    this.router.navigate(['/bienvenido']);
  }

  logIn() {
    this.router.navigate(['login']);
  }
  logInRedSocial() {
    this.router.navigate(['/loginRedSocial']);
  }


  pruebaObs() {
    console.log('**********************Prueba obs****************');
    console.log(this.rolElegido);
    console.log(this.admin);
    console.log(this.submiter);
    console.log(this.checker);

    this.storage.pruebaObs();
  }
  donar() {
    this.storage.getAllHechos().subscribe(res => console.log(res));
  }

  irGraficas() {
    this.router.navigate(['/graficas']);
  }

  irExportPDF() {
    this.router.navigate(['/reportes']);
  }

  irPrincipal() {
    this.router.navigate(['/principalAdmin']);
  }

  toggle(){
    this.sidenav.toggle();
  }

}
