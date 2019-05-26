import { Component, OnInit } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-seleccionar-hecho-checker',
  templateUrl: './seleccionar-hecho-checker.component.html',
  styleUrls: ['./seleccionar-hecho-checker.component.scss']
})
export class SeleccionarHechoCheckerComponent implements OnInit {

  public selector;
  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codigo;
  public nombreCarrera;
  public loading;
  public skip = 0;

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) { 
    this.setSelectableSettings();
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
    return context.dataItem.codigo;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {
   
  /*  this.carreras.subscribe(
    (data: Array<carrera>)=> {
      data.forEach(asig=>{
        if(asig.codigo == this.mySelection[0]){
          this.codigo = asig.codigo;
        }
        console.log('codigo ',this.codigo)
      })
      
    },
    err=>{
      this.apiService.mensajeConError(err);
    }
  )*/
}



  cancelar() {
    this.router.navigate(['/']);
  }
/*
  public asignarCarreraAsignatura(){
    this.selector=1;
    this.carreraAsignatura();
  }*/

  public hechoVerificar() {
    if (this.codigo != undefined) {
      localStorage.setItem('hechoVerificar', this.codigo);
      if(this.selector==1)
        this.router.navigate(['/verificarhecho']);
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
  }

}
