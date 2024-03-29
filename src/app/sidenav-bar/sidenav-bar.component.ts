import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage.service';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

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
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer,private breakpointObserver: BreakpointObserver, private storage: StorageService, private router: Router, private apiService: ApiServiceService) {
    
    iconRegistry.addSvgIcon(
      'google',
      
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/google-plus.svg'));

    
    
    this.storage.select$().subscribe(logueado => {
    this.aux = logueado.valueOf();
      this.aux2 = !this.aux;

    });
    this.aux = this.storage.usrLogged();


    this.storage.roles$().subscribe(rol => {
      if (rol != null && rol != "") {
        this.rolElegido = rol.valueOf();
        if (rol == 'ADMIN')
          this.admin = true;
        else if (rol == 'SUBMITTER')
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

  Visitante() {
    this.router.navigate(['/paginaPrincipal']);
  }

  Citizen() {
    this.router.navigate(['/loginRedSocial']);
  }

  gestionarMecanismosInternos() {
    this.storage.setFuncion("gestionarMecanismosInternos");
    this.router.navigate(['/listarComponentes'])
  }

  gestionarMecanismosExternos() {
    this.storage.setFuncion("gestionarMecanismosExternos");
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
    if (aceptar == true) {
      this.apiService.suscribirse().subscribe((res) => {
        console.log(res);
      },
        err => {
          console.log(err);
        });
    }
  }

  logOut() {
    this.limpiarTodo();
  }

  logIn() {
    this.router.navigate(['login']);
  }
  logInRedSocial() {
    this.router.navigate(['/loginRedSocial']);
  }


  pruebaObs() {


    this.storage.pruebaObs();
  }
  donar() {
    this.router.navigate(['/donar']);
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

  publicar(){
    this.router.navigate(['/publicar']);
  }

  
  gestionarParametros(){
    this.router.navigate(['/gestionParametros']);
  }

  limpiarTodo(){
    this.storage.clearSession();
    this.rolElegido='';
    this.checker=false;
    this.submiter=false;
    this.admin=false;
    this.citizen=false;
    this.router.navigate(['']);
  }
}
