import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { State } from '@progress/kendo-data-query';
import { RowArgs, PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { Hechos } from '../clases/hechos';
import { Mecanismos } from '../clases/mecanismos';
import { getNow } from '@progress/kendo-angular-dateinputs/dist/es2015/util';

interface Item {
  text: string,
  value: string
}


@Component({
  selector: 'app-verificar-hecho',
  templateUrl: './verificar-hecho.component.html',
  styleUrls: ['./verificar-hecho.component.scss'],
  providers: [NgbPaginationConfig, ApiServiceService],
})
export class VerificarHechoComponent implements OnInit {

  public hechos : Observable<Array<any>>;
  public idMecanismo;
  public loading;
  public idHecho : string;
  public hecho : Hechos;
  public hechoEnviar = new Hechos();
  public fecha: Date = new Date();
  public valueM: any = [];
  public listItems: Array<any> = ['Interno','Externo'] ;
  public mecanismos = new Array<Mecanismos>();
  public mostrar : boolean = false;
  public calificacion: Array<Item> = [
    { text: "Verdadero", value: "VERDADERO" },
    { text: "Verdadero a medias", value: "VERD_A_MEDIAS" },
    { text: "Inflado", value: "INFLADO" },
    { text: "Engañoso", value: "ENGANOSO" },
    { text: "Falso", value: "FALSO" },
    { text: "Rídiculo", value: "RIDICULO" },
];
public selectedValue: string;
  
  
  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) {
    this.idMecanismo = localStorage.getItem("idMecanismo");
    this.idHecho = localStorage.getItem("idHecho");

    this.hechos = this.apiService.getAllHechos();

    this.hechos.subscribe(
      ()=> {
        this.loading=false

      },
      err=>{
        this.loading=false;
        //this.apiService.mensajeConError(err);
      }
    )

    this.change();

   }

  ngOnInit() {
  }

  change() {
   
    this.hechos.subscribe(
    (data: Array<Hechos>)=> {
      data.forEach(asig=>{
        if(asig.id == this.idHecho){
          console.log("asig",asig)
          
          this.hecho =  asig;

          console.log("hecho", this.hecho)
          this.mecanismos=this.hecho.mecanismos;

           // this.mostrar = true;  
          }
        
        console.log('mecanismo ',this.mecanismos)
    })
      
    },
    err=>{
      console.log(err);
     // this.apiService.mensajeConError(err);
    }
  )


}

public onChange(value: Date): void {
  this.fecha = value;
}

verificar(justificacion){
    console.log(this.selectedValue);
    this.hecho.justificacion = justificacion;
    this.hecho.fechaRegistroCalificacion = this.fecha;
    this.hecho.calificacion = this.selectedValue;

   console.log(this.hecho);
   this.apiService.calificarHecho(this.hecho);
   this.router.navigate(['/seleccionarHecho']);

}

cancelar(){
  this.router.navigate(['/seleccionarHecho']);
}
  



}
