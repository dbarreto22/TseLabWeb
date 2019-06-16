import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hechos } from '../clases/hechos';
import { ApiServiceService } from 'src/app/api-service.service';

interface Model {
  estado: string;
  cantidad: string;
}

interface ModelMostrar {
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
  public seriesData: ModelMostrar[];
 

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) {

    this.apiService.getTotalHechosPorEstado().subscribe(
      (data: Model)=> {
        
        this.seriesData = [{
          estado: "A comprobar",
          cantidad: parseInt(data.cantidad)
        }, {
          estado: "Nuevo",
          cantidad: parseInt(data.cantidad)
        },{
          estado: "En proceso",
          cantidad: parseInt(data.cantidad)
        },
        {
          estado: "Verificado",
          cantidad: parseInt(data.cantidad)
        },
        {
          estado: "Publicado",
          cantidad: parseInt(data.cantidad)
        },
        {
          estado: "Cancelado",
          cantidad: parseInt(data.cantidad)
        },
        ];
        })       
      err=>{
        console.log(err);
       // this.apiService.mensajeConError(err);
      }
    

   }

  ngOnInit() {
  }

  
}
