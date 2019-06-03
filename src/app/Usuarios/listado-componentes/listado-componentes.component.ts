import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { Mecanismos } from '../clases/mecanismos';
import { MecanismosCompleto } from '../clases/mecanismoCompleto';

@Component({
  selector: 'app-listado-componentes',
  templateUrl: './listado-componentes.component.html',
  styleUrls: ['./listado-componentes.component.scss']
})
export class ListadoComponentesComponent implements OnInit, AfterContentChecked {
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
  public mecanismosGestionInterno : Observable<Array<any>>;
  public mecanismosGestionExterno : Observable<Array<any>>;
  public mecanismosGestionPerifericos : Observable<Array<any>>;
  public mecanismosMostrar = new Array<MecanismosCompleto>() ;

  constructor(public http: HttpClient, private router: Router, private apiService: ApiServiceService) {

    this.setSelectableSettings();

    //********** */Inicailizo el componente de acuerdo a la funcion a realizar
    this.funcion = localStorage.getItem("funcion");
    if (this.funcion == "gestionarMecanismosInternos") {
      this.gestionar = true;
      this.titulo = "Gestión de mecanismos Internos";
      this.encabezado = "Si desea modificar con un mecanismo, seleccione uno y click en modificar.\n De lo contrario click en Cancelar."
      this.mecanismos = this.apiService.getMecanismosInternos();
      this.mecanismos.subscribe(
        (res) => {
          this.loading = false
          console.log("*******************mecanismos");
          console.log(this.mecanismos);
          console.log(res);
  
        },
        err => {
          this.loading = false;
          //this.apiService.mensajeConError(err);
        }
      )
      this.change();
  
    }
    else if (this.funcion == "gestionarMecanismosExternos") {
      this.gestionar = true;
      this.titulo = "Gestión de mecanismos Externos";
      this.encabezado = "Si desea modificar con un mecanismo, seleccione uno y click en modificar.\n De lo contrario click en Cancelar."
      this.mecanismos = this.apiService.getMecanismosExternos();
      this.mecanismos.subscribe(
        (res) => {
          this.loading = false
          console.log("*******************mecanismos");
          console.log(this.mecanismos);
          console.log(res);
  
        },
        err => {
          this.loading = false;
          //this.apiService.mensajeConError(err);
        }
      )
      this.change();
  
    }
    else {
      this.verificar = true;
      this.titulo = "Seleccione mecanismo para Verificar";
      this.encabezado = "Si desea verificar con un mecanismo, seleccione uno y click en Siguiente.\n De lo contrario click en Cancelar."
      //acá deberías programar la lógica que trae todos los componentes
   

    this.idHecho = localStorage.getItem("idHecho");
    this.mecanismosGestionExterno = this.apiService.getMecanismosExternos();
    this.mecanismosGestionInterno = this.apiService.getMecanismosInternos();
    this.mecanismosGestionPerifericos = this.apiService.getNodosPerifericos();
    this.mecanismosGestionExterno.subscribe(
      (res) => {
        this.loading = false
        console.log("*******************mecanismos");
        console.log(this.mecanismos);
        console.log(res);

      },
      err => {
        this.loading = false;
        //this.apiService.mensajeConError(err);
      }
    )
    this.mecanismosGestionInterno.subscribe(
      (res) => {
        this.loading = false
        console.log("*******************mecanismos");
        console.log(this.mecanismos);
        console.log(res);

      },
      err => {
        this.loading = false;
        //this.apiService.mensajeConError(err);
      }
    )
    this.mecanismosGestionPerifericos.subscribe(
      (res) => {
        this.loading = false
        console.log("*******************mecanismos");
        console.log(this.mecanismos);
        console.log(res);

      },
      err => {
        this.loading = false;
        //this.apiService.mensajeConError(err);
      }
    )

    console.log("*********ESTOY ANTES*************");
    this.CargaMecanismoCompletos();
  }

  }

  ngAfterContentChecked() {
    localStorage.setItem("funcion", "");
  }
  ngOnInit() {
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
              this.tipoMecanismo="INTERNO"
            }
            else if (this.funcion == "gestionarMecanismosExternos") {
              this.tipoMecanismo="EXTERNO"
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


  CargaMecanismoCompletos() {
    console.log("*********ESTOY adentro*************");
    this.mecanismosGestionExterno.subscribe(
      (data: Array<MecanismosCompleto>) => {
        data.forEach(asig => {
          asig.mecanismo = "Externo";
          this.mecanismosMostrar.push(asig);
        })

      },
      err => {
        console.log(err);
        // this.apiService.mensajeConError(err);
      }
    )
    this.mecanismosGestionInterno.subscribe(
      (data: Array<MecanismosCompleto>) => {
        data.forEach(asig => {
          asig.mecanismo = "Interno";
          this.mecanismosMostrar.push(asig);
        })

      },
      err => {
        console.log(err);
        // this.apiService.mensajeConError(err);
      }
    )
    this.mecanismosGestionPerifericos.subscribe(
      (data: Array<MecanismosCompleto>) => {
        data.forEach(asig => {
        if (asig.habilitado ){
          asig.mecanismo = "Periferico";
          this.mecanismosMostrar.push(asig);
        }

        })

      },
      err => {
        console.log(err);
        // this.apiService.mensajeConError(err);
      }
    )
      console.log(this.mecanismosMostrar)


  }

  siguiente() {

    //FALTA HACER EL DE API DE GOOGLE
    if (this.codigo != undefined) {
      this.apiService.verificarHechoMecanismoSinApi(this.codigo, this.idHecho).subscribe((res) => {
        console.log("RESP", res);
      },
        err => {
          console.log("ERROR", err);
          //this.apiService.mensajeConError(err);
        }
      );
      alert("Se ha enviado correctamente")
      this.router.navigate(['/seleccionarHecho']);
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
      a.mecanismo=this.tipoMecanismo;
      localStorage.setItem("mecanismo", JSON.stringify(a));
      this.router.navigate(['/mecanismos']);
    } else {
      alert("Debe seleccionar un mecanismo para modificar")
    }
  }

  alta() {
    localStorage.setItem("funcion", "alta");
    this.router.navigate(['/mecanismos']);
  }


}
