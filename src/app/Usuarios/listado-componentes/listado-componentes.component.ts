import { Component, OnInit } from '@angular/core';
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
export class ListadoComponentesComponent implements OnInit {
  
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
  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) { 
    this.setSelectableSettings();

    this.idHecho = localStorage.getItem("idHecho");

    this.mecanismos = this.apiService.getAllMecanismos();

    this.mecanismos.subscribe(
      ()=> {
        this.loading=false
      },
      err=>{
        this.loading=false;
        //this.apiService.mensajeConError(err);
      }
    )

    this.change()
  
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

}
