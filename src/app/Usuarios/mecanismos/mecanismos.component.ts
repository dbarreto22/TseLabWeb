import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Mecanismos } from '../clases/mecanismos';
import { containsElement } from '@angular/animations/browser/src/render/shared';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-mecanismos',
  templateUrl: './mecanismos.component.html',
  styleUrls: ['./mecanismos.component.scss']
})


export class MecanismosComponent implements OnInit {

  public mecanismo: Mecanismos;
  public encabezado;
  public titulo;
  public funcion;
  public modificacion;
  public descripcion;
  public url;
  public estado;
  public id;
  public tipoMecanismo;
  public externo;
  constructor(public http: HttpClient, private router: Router,
    private storage:StorageService, private apiService: ApiServiceService) {
    
    this.funcion = localStorage.getItem("funcion");
    this.tipoMecanismo=
    console.log("**************funcion");
    console.log(this.funcion);
    if (this.funcion == "modificar") {
      this.titulo = "Modificación mecanismo";
      this.encabezado = "Ingrese los datos nuevos para el mecanismo seleccionado.\n Para inhabilitar cambie el estado a inhabilitado";
      this.mecanismo = JSON.parse(localStorage.getItem("mecanismo"));
      this.descripcion = this.mecanismo.descripcion;
      this.url = this.mecanismo.url;
      this.id = this.mecanismo.id;
      this.estado = this.mecanismo.habilitado;
      this.modificacion=true;
      console.log(this.descripcion);
      if(this.url==null || this.url=="")
        this.externo=false;
      else
        this.externo=true;
    }
    else {
      this.titulo = "Alta mecanismo";
      this.encabezado = "Ingrese los datos del mecanismo nuevo";
    }
  }

  ngOnInit() {
    if(localStorage.getItem('rol')!='ADMIN')
    {
      console.log('Mecanismos- El usuario no tiene los permisos suficientes para acceder a esta funcionalidad');
      this.router.navigate(['/'])
    }
  }

  accion() {
    if (this.funcion == "modificar") {
        this.apiService.modificarMecanismo(this.id,this.descripcion,this.url,this.estado,this.mecanismo.mecanismo).subscribe(
         (res)=>{
           console.log(res);
           var error=this.storage.hayError(res);
   
         },(err)=>{
           console.log(err);
           this.storage.manejarError(err);
           
         }
       );

    }
    else {
       this.apiService.altaMecanismo(this.descripcion,this.url,this.mecanismo.mecanismo).subscribe(
        (res)=>{
          console.log(res);
  
        },err=>{
          console.log(err);
        }
      );
  
      
      console.log("alta mecanismo:")
      console.log(this.descripcion);
      console.log(this.url);
    }


  }
  volver(){
    this.router.navigate(['/']);
  }
}
