import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { Hechos } from '../clases/hechos';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-crear-hecho',
  templateUrl: './crear-hecho.component.html',
  styleUrls: ['./crear-hecho.component.scss']
})
export class CrearHechoComponent implements OnInit {

  public userLogueado = localStorage.getItem("userMail");
  public hecho = new Hechos();



  constructor(public http: HttpClient, private apiService: ApiServiceService,
    private storage:StorageService, private router: Router) { }

  ngOnInit() {
  }

  crearHecho(titulo,url){

    if (titulo != undefined && url != undefined){
      this.hecho.titulo = titulo;
      this.hecho.url = url;
      this.hecho.mailUserAlta = this.userLogueado;

      console.log(this.hecho);
  
      this.apiService.crearhecho(titulo,url).subscribe((res)=> {
        console.log("RESP",res);
        this.storage.hayError(res);
      },
      err=>{
        console.log("ERROR",err);
        this.storage.manejarError(err);
      }
      );
      this.router.navigate(['/']);
    }else {
      alert("Debe completar todos los campos")
    }

  }

  cancelar(){
    this.router.navigate(['/']);
  }

}
