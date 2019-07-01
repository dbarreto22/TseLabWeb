import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { Mecanismos } from '../clases/mecanismos';
import { MecanismosCompleto } from '../clases/mecanismoCompleto';
import { StorageService } from 'src/app/storage.service';

interface Item {
  resultado: string,
}

@Component({
  selector: 'app-listado-componentes',
  templateUrl: './listado-componentes.component.html',
  styleUrls: ['./listado-componentes.component.scss']
})
export class ListadoComponentesComponent implements OnInit, OnDestroy, AfterContentChecked {
  public tipoMecanismo;
  public funcion;
  public titulo;
  public encabezado;
  public gestionar = false;
  public verificar = false;
  public selector;
  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codigo;
  public nombreCarrera;
  public loading;
  public skip = 0;
  public mecanismos: Observable<Array<any>>;
  public idHecho;
  public descripcion;
  public url;
  public estado;
  public mecanismosGestionInterno: Observable<Array<any>>;
  public mecanismosGestionExterno: Observable<Array<any>>;
  public mecanismosGestionPerifericos: Observable<Array<any>>;
  public mecanismosMostrar: Observable<Array<any>>;
  public idMecanismoVerificar;
  public resultado: Item;

  constructor(public http: HttpClient, private router: Router,
    private apiService: ApiServiceService, private storage: StorageService) {

    this.storage.funciones$().subscribe(func => {
      this.funcion = func.valueOf();
      console.log('++++++++++++++++Fucnion');
      console.log(this.funcion);
      this.funcion == "gestionarMecanismosInternos" ? this.cargarInternos() : this.cargarExternos();
    }
    );
    this.setSelectableSettings();

    //********** */Inicailizo el componente de acuerdo a la funcion a realizar
    //    this.funcion = localStorage.getItem("funcion");
    if (this.funcion == "gestionarMecanismosInternos") {
      this.cargarInternos();
      this.verificar = false;

    }
    else if (this.funcion == "gestionarMecanismosExternos") {
      this.cargarExternos();
      this.verificar = false;
    }
    else {
      this.verificar = true;
      this.gestionar=false;
      this.titulo = "Seleccione Mecanismo para Verificar";
      this.encabezado = "Si desea verificar con un mecanismo, seleccione uno y click en Siguiente.\n De lo contrario click en Cancelar."
      //acá deberías programar la lógica que trae todos los componentes


      this.idHecho = localStorage.getItem("idHecho");
      this.mecanismosMostrar = this.apiService.getAllMecanismos();
      this.mecanismosMostrar.subscribe(
        (data: Array<MecanismosCompleto>) => {
         
          })
        err => {
          console.log(err);
          // this.apiService.mensajeConError(err);
        }
      console.log(this.mecanismosMostrar);

    }

  }

  ngAfterContentChecked() {
    localStorage.setItem("funcion", "");
  }
  ngOnInit() {
  }

  ngOnDestroy(){
    this.verificar = false;
    this.gestionar = false;
  }
  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: 'single',
    };
  }
  public state: State = {
    skip: 0,
    take: 5
  }

  //cambiar por que buscar 
  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.id;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {

    this.mecanismos.subscribe(
      (data: Array<Mecanismos>) => {
        data.forEach(asig => {
          console.log(data);
          if (asig.id == this.mySelection[0]) {
            this.codigo = asig.id;
            this.descripcion = asig.descripcion;
            this.estado = asig.habilitado;
            this.url = asig.url;
            //********* */Dependiendo de la funcionalidad elegida es el tipo de mecanismo que considero
            if (this.funcion == "gestionarMecanismosInternos") {
              this.tipoMecanismo = "INTERNO"
            }
            else if (this.funcion == "gestionarMecanismosExternos") {
              this.tipoMecanismo = "EXTERNO"
            }
          }
          console.log('codigo ', this.codigo)
        })

      },
      err => {
        console.log(err);
        // this.apiService.mensajeConError(err);
      }
    )


  }

  mecanismoSelected() {

    this.mecanismosMostrar.subscribe(
      (data: Array<MecanismosCompleto>) => {
        data.forEach(asig => {
          if (asig.id == this.mySelection[0]) {
            this.idMecanismoVerificar = asig.id;

          }
          console.log(this.idMecanismoVerificar);
        
        })

      },
      err => {
        console.log(err);
        // this.apiService.mensajeConError(err);
      }
    )
 
  }

  siguiente() {
    if (this.idMecanismoVerificar != undefined) {
      this.apiService.verificarHechoMecanismoSinApi(this.idMecanismoVerificar, this.idHecho).subscribe(
        (res) => {
         this.resultado= JSON.parse(res)
        if(this.resultado.resultado == "ASYNC"){
          alert("El mecanismo utilizado es asyncrono, el resultado lo obtendra a la brevedad");
          this.router.navigate(['/seleccionarHecho']);
        }else if(this.resultado.resultado == "ERROR"){
          alert('ha sucedido un error, vuelva a intentarlo más tarde');
        }
        else {
          alert("El resultado es: " + this.resultado.resultado );
          this.router.navigate(['/seleccionarHecho']);
        }
        
      },
       ( err )=> {
         this.storage.manejarError(err);
          console.log("ERROR", err);
        }
      );
      
    } else {
      alert("Debe seleccionar un mecanismo para verificar")
    }

  }



  cancelar() {
    if (this.codigo == undefined) {
      this.router.navigate(['/seleccionarHecho']);
    }

  }

  volver() {
    this.router.navigate(['/paginaPrincipal']);
  }

  //*********** */Funciones especificas de gestión de mecanismos
  modificar() {
    if (this.codigo != undefined) {
      var a: any = {};
      localStorage.setItem("funcion", "modificar");
      a.id = this.codigo;
      a.descripcion = this.descripcion;
      a.url = this.url;
      a.habilitado = this.estado;
      a.mecanismo = this.tipoMecanismo;
      localStorage.setItem("mecanismo", JSON.stringify(a));
      this.router.navigate(['/mecanismos']);
    } else {
      alert("Debe seleccionar un mecanismo para modificar")
    }
  }

  alta() {
    localStorage.setItem("funcion", "alta");
    localStorage.setItem("tipoMecanismo", this.tipoMecanismo);
    this.router.navigate(['/mecanismos']);
  }

  cargarInternos() {
    this.verificar = false;
    this.gestionar = true;
    this.titulo = "Gestión de Mecanismos Internos";
    this.encabezado = "Si desea modificar con un mecanismo, seleccione uno y click en modificar.\n De lo contrario click en Cancelar."
    this.mecanismos = this.apiService.getMecanismosInternos();
    this.mecanismos.subscribe(
      (res) => {
        this.loading = false
      },
      err => {
        this.loading = false;
      }
    )
    this.change();

  }

  cargarExternos() {
    this.verificar = false;
    this.gestionar = true;
    this.titulo = "Gestión de Mecanismos Externos";
    this.encabezado = "Si desea modificar con un mecanismo, seleccione uno y click en modificar.\n De lo contrario click en Cancelar."
    this.mecanismos = this.apiService.getMecanismosExternos();
    this.mecanismos.subscribe(
      (res) => {
        this.loading = false;

      },
      err => {
        this.loading = false;
      }
    )
    this.change();
  }

}
