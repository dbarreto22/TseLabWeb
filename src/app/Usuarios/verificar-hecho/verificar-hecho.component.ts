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
  public mecanismos : Array<Mecanismos>;
  public calificacion: Array<{ text: string, cal: string }> = [
    { text: "Verdadero", cal: "VERDADERO" },
    { text: "Verdadero a medias", cal: "VERD_A_MEDIAS" },
    { text: "Inflado", cal: "INFLADO" },
    { text: "Engañoso", cal: "ENGANOSO" },
    { text: "Falso", cal: "FALSO" },
    { text: "Rídiculo", cal: "RIDICULO" },
];
  
  
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
          this.hecho =  asig;
          this.mecanismos = asig.mecanismos;
         /* this.hecho.mecanismos.forEach(desc=>{
            if(desc.habilitado == true){

              this.listItems.push(desc.descripcion);
            }
          })*/
        }
        console.log('codigo ',this.hecho)
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

verificar(justificacion, cal){

    this.hecho.justificacion = justificacion;
    this.hecho.calificacion = cal;
    console.log(cal);
    this.apiService.verificarhecho(this.hecho).subscribe(
      data => {
        console.log(data);
      }, err => {
        console.log(err);
      });

}

cancelar(){
  this.router.navigate(['/seleccionarHecho']);
}
  



}
