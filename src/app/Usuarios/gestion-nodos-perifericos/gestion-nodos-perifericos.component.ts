import { Component, OnInit } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { State } from '@progress/kendo-data-query';
import { Perifericos } from '../clases/perifericos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gestion-nodos-perifericos',
  templateUrl: './gestion-nodos-perifericos.component.html',
  styleUrls: ['./gestion-nodos-perifericos.component.scss']
})
export class GestionNodosPerifericosComponent implements OnInit {
  public selector;
  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codigo;
  public nombreCarrera;
  public loading;
  public skip = 0;
  public perifericos : Observable<Array<any>>;
  constructor(public http: HttpClient, private router: Router ,private apiService:ApiServiceService) { 
    this.setSelectableSettings();

    this.perifericos = this.apiService.getNodosPerifericos();

    this.perifericos.subscribe(
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
    if(localStorage.getItem('rol')!='ADMIN')
    {
      console.log('Gestión Perifericos- El usuario no tiene los permisos suficientes para acceder a esta funcionalidad');
      this.router.navigate(['/'])
    }
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


  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.id;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {
   
    this.perifericos.subscribe(
    (data: Array<Perifericos>)=> {
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

public modificarNodo() {
  if (this.codigo != undefined) {
    localStorage.setItem('idNodo', this.codigo);
    this.router.navigate(['/modificarNodosPerifericos']);
  }
  else
    alert('Debe seleccionar una carrera para continuar.');
}

crearNodo(){
    this.router.navigate(['/crearNodosPerifericos']);
}





}
