import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hechos } from '../clases/hechos';
import { ApiServiceService } from 'src/app/api-service.service';

interface Item {
  text: string,
  value: string
}
@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
  styleUrls: ['./export-pdf.component.scss']
})
export class ExportPDFComponent implements OnInit {

  public hechos : Observable<Array<any>>;
  public h  = new Array<Hechos>();
  public estado: Array<Item> = [
    { text: "", value: "" },
    { text: "A comprobar", value: "A_COMPROBAR" },
    { text: "Nuevo", value: "NUEVO" },
    { text: "En proceso", value: "EN_PROCESO" },
    { text: "Verificado", value: "VERIFICADO" },
    { text: "Publicado", value: "PUBLICADO" },
    { text: "Cancelado", value: "CANCELADO" },
];

public selectedValue: string;
public mostrarBoton : boolean = false;
public mostrarGrid : boolean = false;

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) {}

  ngOnInit() {
  }
  
  public repeatHeaders = true;

  buscar(){
    
    console.log(this.selectedValue)
    if(this.selectedValue == "" || this.selectedValue == undefined){
      alert("Debe seleccionar almenos un Estado");
    }else{
      this.mostrarBoton = true;
      this.mostrarGrid = true;
      this.h = new Array<Hechos>();

    this.hechos = this.apiService.gethechosByEstados(this.selectedValue);
    this.hechos.subscribe(
      (data: Array<Hechos>)=> {
        data.forEach(asig=>{
         
          this.h.push(asig);
        })
        console.log(data)
        this.h.forEach(r =>{
          if(r.estado == "A_COMPROBAR"){
            r.estado = "A Comprobar";
          }else if(r.estado == "NUEVO"){
            r.estado = "Nuevo";
          }else if(r.estado == "EN_PROCESO"){
            r.estado = "En proceso";
          }else if(r.estado == "VERIFICADO"){
            r.estado = "Verificado";
          }else if(r.estado == "PUBLICADO"){
            r.estado = "Publicado";
          }else if(r.estado == "CANCELADO"){
            r.estado = "Cancelado";
          }
        })
        
            
        
      },
      err=>{
        console.log(err);
       // this.apiService.mensajeConError(err);
      }
    )

    }
  }
  


}
