import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Hechos } from '../clases/hechos';
import { ApiServiceService } from 'src/app/api-service.service';
import { Usuario } from '../clases/usuario';
import { CalificacionPDF } from '../clases/calificacionPDF';
import { utimes } from 'fs';

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
  public calificaciones = new Array<CalificacionPDF>();
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
public cantDias: Array<Item> = [
  { text: "", value: "" },
  { text: "30 Dias", value: "30" },
  { text: "60 Dias", value: "60" },
  { text: "90 Dias", value: "90" },
];
public listUsr = new Array<Usuario>();

public cantDiasSelected: string;
public userSelected : string;
public nickname : string;
public mostrarBoton : boolean = false;
public mostrarGrid : boolean = false;
public usuarios: Observable<Array<Object>>;
public total : number = 0;

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) {
    
    this.usuarios = this.apiService.getCheckers();
    this.usuarios.subscribe(
      (res : Array<Usuario>) =>{ 
        res.forEach(u=>{
          this.listUsr.push(u);
        })
        console.log(res)},
      ee => {
         console.log(ee)
      }
    )

  }

  ngOnInit() {
  }

  buscar(){
    console.log("cant",this.cantDiasSelected)
    console.log("Mail", this.userSelected)
    if(this.cantDiasSelected == "" || this.cantDiasSelected == undefined || this.userSelected  == "" || this.userSelected == undefined){
      alert("Debe seleccionar Cantidad de Dias y Usuario")
    }else{
    this.usuarios.subscribe(
      (res : Array<Usuario>) =>{ 
        res.forEach(u=>{
          if (u.email == this.userSelected){
            this.nickname = u.nickname;
            console.log(this.nickname)
          }
        })
        console.log(res)},
      ee => {
         console.log(ee)
      }
    )
    console.log(this.nickname)


      this.mostrarBoton = true;
      this.apiService.servicioPDF(this.userSelected , this.cantDiasSelected).subscribe((res: Array<CalificacionPDF>)=>{
        if (res.length == 0){
          alert("No existen datos para los parametros seleccionados.")
        }else{
          this.calificaciones = res;
          this.calificaciones.forEach(c =>{
            this.total = this.total + parseInt(c.cantidad);
          })
        }
        
      
        console.log(res)

      })
      
    }
    


  }
  
  public repeatHeaders = true;

  

}
