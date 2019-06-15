import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hechos } from '../clases/hechos';
import { ApiServiceService } from 'src/app/api-service.service';

interface Model {
  estado: string;
  cantidad: number;
}
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  public hechos : Observable<Array<any>>;
  public h  = new Array<Hechos>();
  public seriesData: Model[];
 

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) {
    let cantNuevo =0;
    let cantAcomprar = 0;
    let cantEnproceso =0;
    let cantVerificado=0;
    let cantPublicado=0;
    let cantCancelado=0;

    this.hechos = this.apiService.getAllHechos();
    this.hechos.subscribe(
      (data: Array<Hechos>)=> {
        data.forEach(asig=>{
          
          if(asig.estado === "A_COMPROBAR"){
            cantAcomprar= cantAcomprar + 1;
          }else if(asig.estado ==="NUEVO"){
            cantNuevo =  cantNuevo +1;
            
          }else if(asig.estado === "EN_PROCESO"){
            cantEnproceso = cantEnproceso +1;
          }else if (asig.estado === "VERIFICADO"){
            cantVerificado = cantVerificado +1;
          }else if(asig.estado === "PUBLICADO"){
            cantPublicado = cantVerificado+1;
          }else if (asig.estado === "CANCELADO"){
            cantCancelado = cantVerificado+1;
          }
        })
        console.log(cantEnproceso)
        console.log(data)
        this.seriesData = [{
          estado: "A comprobar",
          cantidad: cantAcomprar
        }, {
          estado: "Nuevo",
          cantidad: cantNuevo
        },{
          estado: "En proceso",
          cantidad: cantEnproceso
        },
        {
          estado: "Verificado",
          cantidad: cantVerificado
        },
        {
          estado: "Publicado",
          cantidad: cantPublicado
        },
        {
          estado: "Cancelado",
          cantidad: cantCancelado
        },
        ];
      },
      err=>{
        console.log(err);
       // this.apiService.mensajeConError(err);
      }
    )

   }

  ngOnInit() {
  }

  
}
