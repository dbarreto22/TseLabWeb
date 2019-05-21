import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import 'rxjs/add/observable/fromPromise'


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {


  public DtUsuario = new Usuario();
  constructor(public http: HttpClient, private router: Router) {}

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
  }

  cancelar() {
    this.router.navigate(['/setingsUser']);
  }

  crearUsuario(cedula, nombre, apellido, mail, password) {
   /* console.log(apellido);
    this.DtUsuario.cedula = cedula;
    this.DtUsuario.nombre = nombre;
    this.DtUsuario.apellido = apellido;
    this.DtUsuario.email = mail;
    this.DtUsuario.password = password;
    this.apiService.ingresarUsuario(this.DtUsuario).subscribe(
      data => {
        this.apiService.mensajeSinError(data, 1);
      },
      err => {
        this.apiService.mensajeConError(err);
      }
    );
    this.router.navigate(['/setingsUser']);*/
  }

}