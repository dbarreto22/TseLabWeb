import { Component, OnInit } from '@angular/core';

import { State, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { SelectableSettings, RowArgs, PageChangeEvent } from "@progress/kendo-angular-grid";
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public nombre;
  public mail;
  public usuarios: Observable<Array<Object>>;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public dialogOpened = false;
  constructor(  private apiService: ApiServiceService,
    private router: Router
  ) {
      this.usuarios = this.apiService.getAllUsuarios();
      this.usuarios.subscribe(
        (res) =>{ console.log(res)},
        ee => {
           console.log(ee)
        }
      )

    }

  ngOnInit() {
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single"
    };
  }
  public skip = 0;
  public state: State = {
    skip: 0,
    take: 5
  }


  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.id;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {
    this.usuarios.subscribe(
      (data: Array<Usuario>) => {
        data.forEach(usr => {
          if (usr.nombre == this.mySelection[0]) {
            this.nombre = usr.nombre;
            this.mail = usr.email;
            console.log("***************NombreUsuario********************");
            console.log(this.nombre);
            localStorage.setItem("idHecho",this.nombre);
          }
        })

      },
      err => {
        console.error("Se rompe en hechos.component")
        //this.apiService.mensajeConError(err);
      }
    )
  }

  seleccionarUsuarios(){
    this.router.navigate(["/usuarios"]);
  }

}
