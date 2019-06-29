import { Component, OnInit } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Donacion } from '../clases/donacion';
import { Observable } from 'rxjs';
import { State } from '@progress/kendo-data-query';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.scss']
})
export class DonacionesComponent implements OnInit {

  public selector;
  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codigo;
  public nombreCarrera;
  public loading;
  public skip = 0;
  public donacion : Donacion;
  public donaciones : Observable<Array<any>>;
  public donacionMostrar = new Array<Donacion>();
  public pesos : number = 0;
  public dolares : number = 0;

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) { 
    this.apiService.getCheckers().subscribe(res =>{
      console.log("Chechers" ,res)
    })
    this.donaciones = this.apiService.getAllDonaciones();
    this.donaciones.subscribe(
      (data : Array<Donacion>)=> {
          data.forEach(d =>{
          if (d.moneda == "pesos"){
            d.montoMoneda="$U " + d.monto;
            this.pesos = this.pesos +parseInt(d.monto);
          }else if(d.moneda == "USD"){
            d.montoMoneda="USD " + d.monto;
            this.dolares = this.dolares +parseInt(d.monto);
          }
          
        //  this.donacionMostrar.push(d);

        })
        console.log(this.donacionMostrar);
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

}
