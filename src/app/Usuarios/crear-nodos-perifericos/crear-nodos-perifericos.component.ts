import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { Mecanismos } from '../clases/mecanismos';
import { Perifericos } from '../clases/perifericos';

@Component({
  selector: 'app-crear-nodos-perifericos',
  templateUrl: './crear-nodos-perifericos.component.html',
  styleUrls: ['./crear-nodos-perifericos.component.scss']
})
export class CrearNodosPerifericosComponent implements OnInit {

  public habilitados: Array<string> = ["Si", "No"];
  public habilita : string;
  public nodoPeriferico : Perifericos;

  constructor(public http: HttpClient, private apiService: ApiServiceService,private router: Router) { }

  ngOnInit() {
  }

	

  crearNodo(descripcion,url,usuario, password){
    console.log("DESC", descripcion);
    //let desc = descripcion
   if(descripcion!= undefined && url!= undefined && usuario!= undefined && password!= undefined && this.habilita != undefined){

    this.nodoPeriferico.descripcion = descripcion;
    this.nodoPeriferico.url = url,
    this.nodoPeriferico.usuario = usuario;
    this.nodoPeriferico.password = password;
    if(this.habilita == "Si"){
      this.nodoPeriferico.habilitado = true;
    }else{
      this.nodoPeriferico.habilitado = false;
    }

  /*  this.apiService.crearMecanismoVerificacion(this.nodoPeriferico, "PERIFERICO").subscribe((res)=> {
      console.log("RESP",res);
      console.log(this.nodoPeriferico);
    },
    err=>{
      console.log("ERROR",err);
      console.log(this.nodoPeriferico);
      //this.apiService.mensajeConError(err);
    }
    )*/


   }else{
    alert("Debe completar todos los datos.")
  }
   
   


  }

}
