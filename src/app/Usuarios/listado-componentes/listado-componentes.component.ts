import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { Mecanismos } from '../clases/mecanismos';

@Component({
  selector: 'app-listado-componentes',
  templateUrl: './listado-componentes.component.html',
  styleUrls: ['./listado-componentes.component.scss']
})
export class ListadoComponentesComponent implements OnInit, AfterContentChecked{
  
  public titulo;
  public encabezado;
  public gestionar=false;
  public verificar=false;
  public selector;
  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codigo;
  public nombreCarrera;
  public loading;
  public skip = 0;
  public mecanismos : Observable<Array<any>>;
  public idHecho;
  public descripcion;
  public url;
  public estado;
  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) { 
    this.setSelectableSettings();

    console.log(localStorage.getItem("funcion"));
    if(localStorage.getItem("funcion")=="gestionarMecanismos")
    {
      this.gestionar=true;
      this.titulo="Gestión de mecanismos";
      this.encabezado="Si desea modificar con un mecanismo, seleccione uno y click en modificar.\n De lo contrario click en Cancelar."
    }
    else{
      this.verificar=true;
      this.titulo="Seleccione Hecho a Verificar";
      this.encabezado="Si desea verificar con un mecanismo, seleccione uno y click en Siguiente.\n De lo contrario click en Cancelar."
    }
    this.idHecho = localStorage.getItem("idHecho");

    this.mecanismos = this.apiService.getAllMecanismos();
  
    this.mecanismos.subscribe(
      (res)=> {
        this.loading=false
          console.log("*******************mecanismos");
    console.log(this.mecanismos);
    console.log(res);

      },
      err=>{
        this.loading=false;
        //this.apiService.mensajeConError(err);
      }
    )

    this.change()
  
  }

  ngAfterContentChecked(){
    localStorage.setItem("funcion","");
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
    (data: Array<Mecanismos>)=> {
      data.forEach(asig=>{
        console.log(data);
        if(asig.id == this.mySelection[0]){
          this.codigo= asig.id;
          this.descripcion=asig.descripcion;
          this.estado=asig.habilitado;
          this.url=asig.url;
        }
        console.log('codigo ',this.codigo)
      })
      
    },
    err=>{
      console.log(err);
     // this.apiService.mensajeConError(err);
    }
  )


}

siguiente(){
  if(this.codigo != undefined){   
    this.apiService.verificarHechoComponente(this.codigo,this.idHecho),
    alert("Se ha enviado correctamente")
    this.router.navigate(['/seleccionarHecho']);
  }else{
    alert("Debe seleccionar un mecanismo para verificar")
  }

}



  cancelar() {
    if(this.codigo == undefined){
      this.router.navigate(['/seleccionarHecho']);
    }
   
  }

  volver(){
    this.router.navigate(['/paginaPrincipal']);
  }

  modificar(){
    if(this.codigo != undefined){
      var a: any = {};
      localStorage.setItem("funcion", "modificar");
      a.id=this.codigo;
      a.descripcion=this.descripcion;
      a.url=this.url;
      a.habilitado=this.estado;
      localStorage.setItem("mecanismo", JSON.stringify(a));
      this.router.navigate(['/mecanismos']);
    }else{
      alert("Debe seleccionar un mecanismo para modificar")
    }
  }

  alta(){
    localStorage.setItem("funcion", "alta");
    this.router.navigate(['/mecanismos']);
  }

  inhabilitar(){
    localStorage.setItem("funcion", "inhabilitar");
    this.router.navigate(['/mecanismos']);
    
  }

}
