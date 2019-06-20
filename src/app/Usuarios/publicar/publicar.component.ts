import { Component, OnInit } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Hechos } from '../clases/hechos';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.scss']
})
export class PublicarComponent implements OnInit {

  public selector;
  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codigo;
  public nombreCarrera;
  public loading;
  public skip = 0;
  public hecho : Hechos;
  public hechos : Observable<Array<any>>;

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) { 
    this.setSelectableSettings();

    this.hechos = this.apiService.gethechosByEstados("VERIFICADO");
    this.hechos.subscribe(
      ()=> {
        console.log(this.hechos)
        this.loading=false
      },
      err=>{
        this.loading=false;
        //this.apiService.mensajeConError(err);
      }
    )
      
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
   
    this.hechos.subscribe(
    (data: Array<Hechos>)=> {
      console.log(data)
      data.forEach(asig=>{
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

publicar(){
  if (this.codigo != undefined) {
  this.apiService.setEstadoHechos(this.codigo,"PUBLICADO").subscribe(
    (res)=>{
      console.log(res);
    }
  )
  this.router.navigate(['/']);
  }else{
    alert("Debe seleccionar un hecho a verirficar")
  }
}

cancelar(){
  this.router.navigate(['/']);
}

}
