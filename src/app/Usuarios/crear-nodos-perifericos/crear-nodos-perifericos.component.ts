import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { Mecanismos } from '../clases/mecanismos';
import { Perifericos } from '../clases/perifericos';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-crear-nodos-perifericos',
  templateUrl: './crear-nodos-perifericos.component.html',
  styleUrls: ['./crear-nodos-perifericos.component.scss']
})
export class CrearNodosPerifericosComponent implements OnInit {

  public habilitados: Array<string> = ["Si", "No"];
  public habilita : string;
  public nodoPeriferico = new Perifericos();

  constructor(public http: HttpClient, private apiService: ApiServiceService,
    private storage:StorageService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('rol')!='ADMIN')
    {
      console.log('Mecanismos- El usuario no tiene los permisos suficientes para acceder a esta funcionalidad');
      this.router.navigate(['/'])
    }

  }

	

  crearNodo(descripcion,usuario, password){
  
    //let desc = descripcion
    console.log("DESC", descripcion)
    console.log("user", usuario)
    console.log("pass", password)
    console.log("habilita", this.habilita)
   if(descripcion!= undefined && usuario!= undefined && password!= undefined && this.habilita != undefined){

    this.nodoPeriferico.descripcion = descripcion;
    this.nodoPeriferico.usuario = usuario;

    this.nodoPeriferico.password = password;
    this.nodoPeriferico.mecanismo = "PERIFERICO";
    if(this.habilita == "Si"){
      this.nodoPeriferico.habilitado = true;
    }else{      
      this.nodoPeriferico.habilitado = false;
    }

    this.apiService.crearMecanismoVerificacionPeriferico(this.nodoPeriferico ).subscribe((res)=> {
      console.log("RESP",res);
      console.log(this.nodoPeriferico);
      this.storage.hayError(res);
      this.router.navigate(['/gestionNodosPerifericos']);
    
    },
    err=>{
      console.log("ERROR",err);
      console.log(this.nodoPeriferico);
      this.storage.manejarError(err);
     
    }
    )


   }else{
    alert("Debe completar todos los datos.")
   }
  }

  cancelar(){
    this.router.navigate(['/gestionNodosPerifericos']);
  }

}
