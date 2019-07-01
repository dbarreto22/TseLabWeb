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
import { StorageService } from 'src/app/storage.service';


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

  public hechos : Observable<any>;
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
  
  
  constructor(public http: HttpClient, private router: Router,
    private storage:StorageService, private apiService:ApiServiceService) {
    this.idMecanismo = localStorage.getItem("idMecanismo");
    this.idHecho = localStorage.getItem("idHecho");

    this.hechos = this.apiService.gethechoById(this.idHecho);

    this.hechos.subscribe(
      (data:Hechos)=> {
        this.hecho = data;
        this.loading=false
        this.hecho.resultadosMecanismos.forEach(r=>{
          r.mecanismo.calificacion = r.calificacion;
          this.mecanismos.push(r.mecanismo);
        }) 
        if(this.mecanismos.length > 0){
          this.mostrar = true;
        }
      },
      err=>{
        this.loading=false;
        //this.apiService.mensajeConError(err);
      }
    )
   }

  ngOnInit() {
  }

verificar(justificacion){ 
   this.apiService.calificarHecho(this.hecho.id, this.selectedValue,justificacion).subscribe((res)=> {
    console.log("RESP",res);
    console.log(this.hecho);
    this.storage.hayError(res);
  },
  err=>{
    console.log("ERROR",err);
    console.log(this.hecho);
    this.storage.manejarError(err);
    //this.apiService.mensajeConError(err);
  }
  );
   this.router.navigate(['/seleccionarHecho']);

}


cancelar(){
  this.router.navigate(['/seleccionarHecho']);
}

}
