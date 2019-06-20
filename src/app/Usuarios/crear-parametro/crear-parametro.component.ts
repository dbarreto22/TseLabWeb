import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-parametro',
  templateUrl: './crear-parametro.component.html',
  styleUrls: ['./crear-parametro.component.scss']
})
export class CrearParametroComponent implements OnInit {



  constructor(public http: HttpClient, private apiService: ApiServiceService,private router: Router) { }

  ngOnInit() {
  }

  crearParametro(name,valor){

    if (name != undefined && valor != undefined){
      this.apiService.agregarParametro(name,valor).subscribe((res)=> {
        console.log("RESP",res);
      },
      err=>{
        console.log("ERROR",err);
        //this.apiService.mensajeConError(err);
      }
      );
      alert("Se ha enviado correctamente.");
      this.router.navigate(['/gestionParametros']);
    }else {
      alert("Debe completar todos los campos")
    }
    }
    
}
  
