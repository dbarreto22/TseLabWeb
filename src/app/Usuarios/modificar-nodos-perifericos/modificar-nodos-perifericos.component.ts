import { Component, OnInit } from '@angular/core';
import { Perifericos } from '../clases/perifericos';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/storage.service';


@Component({
  selector: 'app-modificar-nodos-perifericos',
  templateUrl: './modificar-nodos-perifericos.component.html',
  styleUrls: ['./modificar-nodos-perifericos.component.scss']
})
export class ModificarNodosPerifericosComponent implements OnInit {

  public habilitados: Array<string> = ["Si", "No"];
  public habilita : string;
  public nodoPerifericos: Observable<Array<any>>;
  public nodo = new Perifericos();

  public idNodo ;


  constructor(public http: HttpClient, private apiService: ApiServiceService, 
    private storage:StorageService, private router: Router) { 

    this.nodoPerifericos = this.apiService.getNodosPerifericos();
    this.idNodo = localStorage.getItem("idNodo")

    this.nodoPerifericos.subscribe(
      ()=> {},
      err=>{
       
      }
    )

    this.change();
  }

  ngOnInit() {
  }


  change() {
   
    this.nodoPerifericos.subscribe(
    (data: Array<Perifericos>)=> {
      data.forEach(asig=>{
        if(asig.id == this.idNodo){
          this.nodo = asig
          if(this.nodo.habilitado){
            this.habilita ="Si"
          }else{
            this.habilita= "No"
          }
        }
        console.log('nodo ',this.nodo)
      })
      
    },
    err=>{
      console.log(err);
    }
  )


}

	

  modificarNodo(descripcion,url,usuario, password){
    let nodoEnviar = new Perifericos();
   if(descripcion!= undefined && url!= undefined && usuario!= undefined && password!= undefined && this.habilita != undefined){
    nodoEnviar.id = this.idNodo;
    nodoEnviar.descripcion = descripcion;
    nodoEnviar.url = url,
    nodoEnviar.usuario = usuario;
    nodoEnviar.password = password;
    nodoEnviar.mecanismo = "PERIFERICO";
    if(this.habilita == "Si"){
      nodoEnviar.habilitado = true;
    }else{      
      nodoEnviar.habilitado = false;
    }

    this.apiService.modificarMecanismoVerificacionPeriferico(nodoEnviar ).subscribe((res)=> {
      console.log("RESP",res);
      console.log(nodoEnviar);
      this.storage.hayError(res);
      this.router.navigate(['/']);
    },
    err=>{
      console.log("ERROR",err);
      this.storage.manejarError(err);
     }
    )


   }else{
    alert("Debe completar todos los datos.")
  }
  }


  cancelar(){
    this.router.navigate(['/']);
  }
}
