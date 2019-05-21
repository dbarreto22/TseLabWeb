import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';


@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.scss']
})
export class AbmUsuariosComponent implements OnInit {

  @Output() public cedula = new EventEmitter<string>();
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public usuarios: Observable<Array<Object>>;
  public cedulaSelect: string;
  public usuario = new Usuario();
  public dialogOpened = false;
  public loading;
  public skip = 0;

  constructor(public http: HttpClient, private apiService: ApiServiceService,
    private router: Router) {
    this.loading = true;
    this.setSelectableSettings();
   // this.usuarios = this.apiService.getAllUser();
    this.usuarios.subscribe(
      () => this.loading = false,
      err => {
      this.loading = false;
        //this.apiService.mensajeConError(err)
      }
    )


  }

  ngOnInit() {
    let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single",
    };
  }
  public state: State = {
    skip: 0,
    take: 5
  }

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.cedula;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {

    this.usuarios.subscribe(
      (data: Array<Usuario>) => {
        data.forEach(asig => {
        /*  if (asig.cedula == this.mySelection[0]) {
            this.usuario = asig;
            this.cedulaSelect = asig.cedula;
            console.log(this.cedulaSelect);

          }*/
        })

      },
      err => {
       // this.apiService.mensajeConError(err);
      }
    )
  }

  public crearUsuario() {
    this.router.navigate(['/crearUsr']);

  }

  public eliminarUsuario() {
    this.dialogOpened = true;
  }

  public confirmarEliminarUsr() {
    if (this.cedulaSelect != undefined) {
     // this.apiService.deleteUser(this.cedulaSelect).subscribe(
     //   data => {
    //      this.apiService.mensajeSinError(data, 4);
     //     this.router.navigate(['/']);
    //   },
     //   err => {
     //     this.apiService.mensajeConError(err);
   //       this.router.navigate(['/']);
    //    });
      this.dialogOpened = false;
    }
    else
      alert('Debe seleccionar un usuario para continuar.');
  }


  public action() {
    this.dialogOpened = false;
  }

  public modificarUsuario() {
    if (this.cedulaSelect != undefined) {
      localStorage.setItem('cedulaABM', this.cedulaSelect);
      this.router.navigate(['/modificarUsr']);
    }
    else
      alert('Debe seleccionar un usuario para continuar.');
  }

  public asignarRol() {
    if (this.cedulaSelect != undefined) {
      localStorage.setItem('cedulaABM', this.cedulaSelect);
      this.router.navigate(['/asignarRol']);
    }
    else
      alert('Debe seleccionar un usuario para continuar.');
  }


}
