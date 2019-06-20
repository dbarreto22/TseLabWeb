import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { Parametro } from '../clases/parametro';

@Component({
  selector: 'app-modificar-parametro',
  templateUrl: './modificar-parametro.component.html',
  styleUrls: ['./modificar-parametro.component.scss']
})
export class ModificarParametroComponent implements OnInit {

  public parametro: Parametro;
  public name;


  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) {

    this.name = localStorage.getItem("name")
    this.apiService.getParametros().subscribe(
      (data: Array<Parametro>)=> {
       data.forEach(p =>{
         if(this.name == p.name){
           this.parametro = p;
           console.log(p)
           console.log(this.parametro)
         }
       })
      },
      err=>{
        
        //this.apiService.mensajeConError(err);
      }
    )

    console.log(this.parametro);
   }

  ngOnInit() {
  }

  modificarParametro(name,valor){

    if(name != undefined && valor != undefined){
      this.apiService.modificarParametro(name, valor).subscribe((res)=>{
        console.log(res);
      }
      )
      alert("Se ha modificado correctamente");
      this.router.navigate(['/gestionParametros']);
    }else{
      alert("")
    }

  }


  cancelar(){
    this.router.navigate(['/gestionParametros']);
  }

}
