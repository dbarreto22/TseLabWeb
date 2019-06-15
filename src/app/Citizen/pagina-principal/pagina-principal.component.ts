import { Component, OnInit } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
;
import { Observable, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { State } from '@progress/kendo-data-query';
import { listadoHechos } from 'src/app/Usuarios/clases/listadohechos';
import { ApiServiceService } from 'src/app/api-service.service';
import { Hechos } from 'src/app/Usuarios/clases/hechos';


interface Item {
  text: string,
  value: string
}


@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent {

  public selector;
  public dialogOpened = false;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public codigo;
  public nombreCarrera;
  public loading;
  public skip = 0;
  public hecho : Hechos;
  public hechos :any;  
  public listadoGeneral :  Observable<object>;
  public listado : listadoHechos;
  public canthechos  = 10;
  public page : number = 1;
  public activo : boolean = false;
  public cantElementos : number;
  public totalPaginas : number;
  public mostrarSig : boolean = false;
  public mostrarAnt : boolean = false;
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
  public titulo: string;
  public url: string;

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) { 
    this.setSelectableSettings();
    this.iniciarListado();
   
  }

  iniciarListado(){
    this.listadoGeneral = this.apiService.gethechospaginado(this.page, this.canthechos);
    this.listadoGeneral.subscribe(
    (res : listadoHechos)=> {
      console.log(res);
      this.listado = res;
      console.log(this.listado)
      this.cantElementos = parseInt(res.cantElementos)
      console.log(res.cantElementos)
      console.log(this.cantElementos)
  console.log(this.canthechos)

  this.totalPaginas= this.cantElementos/this.canthechos;
  console.log(this.totalPaginas - Math.floor(this.totalPaginas))
  if (this.totalPaginas - Math.floor(this.totalPaginas) > 0){
    this.totalPaginas=  Math.trunc(this.cantElementos/this.canthechos) + 1 ;
  }else {
    this.totalPaginas=  Math.trunc(this.cantElementos/this.canthechos)
  }
  console.log(this.totalPaginas)
    },
    err=>{
      this.loading=false;
      //this.apiService.mensajeConError(err);
    }
  )      
  }

  ngOnInit() {
  }

  trerDatosAnterior(){
    this.page--
    if (this.activo){
      if(this.totalPaginas == 0){
        this.page = 0;
      }else{
        if(this.page > this.totalPaginas){
          this.page--
          this.mostrarSig = true;
          this.mostrarAnt = false;
        }else{
          this.mostrarAnt = false;
          this.buscar(this.titulo, this.url);
        }
      }
    }else{
    if (this.page < 1){
      this.page++
      this.mostrarAnt = true
      this.mostrarSig = false;
    }else{
      this.mostrarSig = false;
      this.anterior();
    }
  }
}
  
  anterior(){
    //if(!this.activo){
   
    this.apiService.gethechospaginado(this.page, this.canthechos).subscribe(
      ( res : listadoHechos)=> {
        console.log(res);
        this.listado = res;
        console.log(this.listado)
        this.cantElementos = parseInt(res.cantElementos)
        console.log(res.cantElementos)
        console.log(this.cantElementos)
        console.log(this.canthechos)
        console.log(this.totalPaginas)
        this.totalPaginas= this.cantElementos/this.canthechos;
  console.log(this.totalPaginas - Math.floor(this.totalPaginas))
  if (this.totalPaginas - Math.floor(this.totalPaginas) > 0){
    this.totalPaginas=  Math.trunc(this.cantElementos/this.canthechos) + 1 ;
  }else {
    this.totalPaginas=  Math.trunc(this.cantElementos/this.canthechos)
  }
  console.log(this.totalPaginas)
  
      
      },
      err=>{
        this.loading=false;
        //this.apiService.mensajeConError(err);
      }
    )
//  }else{
  //  this.buscar(titulo, url);
  //}
}

  traerDatosSig(){
    this.page++
    if (this.activo){
      if(this.totalPaginas == 0){
          this.page = 0;
      }else{
        if(this.page > this.totalPaginas){
          this.page--
          this.mostrarSig = true;
          this.mostrarAnt = false;
        }else{
          this.mostrarAnt = false;
          this.buscar(this.titulo, this.url);
        }
      }
    }else{
    if(this.page > this.totalPaginas){
      this.page--
      this.mostrarSig = true;
      this.mostrarAnt = false;
    }else{
      this.mostrarAnt = false;
      this.siguiente();
    }
  
}
}
  siguiente(){
  
  this.apiService.gethechospaginado(this.page, this.canthechos).subscribe(
    (res : listadoHechos)=> {
      console.log(res);
      this.listado = res;
      console.log(this.listado)
      this.cantElementos = parseInt(res.cantElementos)
      console.log(res.cantElementos)
      console.log(this.cantElementos)
      console.log(this.canthechos)
      console.log(this.totalPaginas)
      this.totalPaginas= this.cantElementos/this.canthechos;
      console.log(this.totalPaginas - Math.floor(this.totalPaginas))
      if (this.totalPaginas - Math.floor(this.totalPaginas) > 0){
        this.totalPaginas=  Math.trunc(this.cantElementos/this.canthechos) + 1 ;
      }else {
        this.totalPaginas=  Math.trunc(this.cantElementos/this.canthechos)
      }
      console.log(this.totalPaginas)
    },
    err=>{
      this.loading=false;
      //this.apiService.mensajeConError(err);
    }
  )

}

buscar(titulo, url){

  console.log(titulo)
  this.titulo = titulo;
  this.url= url;
  this.activo = true;
  
  if(this.selectedValue == undefined){
    alert("Debe seleccionar almenos un Estado");
    this.iniciarListado();
  }else{
  
    if (this.titulo == ""){    
      this.titulo = "null";
    }
    if(this.url == ""){
      this.url = "null";
    }
    console.log(this.url)
    console.log(this.titulo)
    this.listadoBuscar();
  }
   
  
}

listadoBuscar(){
  this.apiService.getFiltros(this.page, this.canthechos, this.titulo, this.url, this.selectedValue).subscribe(
    (res : listadoHechos)=> {
      console.log(res);
      this.listado = res;
      console.log(this.listado)
      this.cantElementos = parseInt(res.cantElementos)
      console.log(res.cantElementos)
      console.log(this.cantElementos)
      console.log(this.canthechos)
      console.log(this.totalPaginas)
      this.totalPaginas= this.cantElementos/this.canthechos;
      console.log(this.totalPaginas - Math.floor(this.totalPaginas))
      if (this.totalPaginas - Math.floor(this.totalPaginas) > 0){
        this.totalPaginas=  Math.trunc(this.cantElementos/this.canthechos) + 1 ;
      }else {
        this.totalPaginas=  Math.trunc(this.cantElementos/this.canthechos)
      }

      if(this.page == this.totalPaginas){
        this.mostrarSig = true;
        this.mostrarAnt = true;
      }else{
        this.mostrarSig = false;
        this.mostrarAnt = false;
      }
      console.log(this.totalPaginas)
    },
    err=>{
      this.loading=false;
      //this.apiService.mensajeConError(err);
    }
  )
  

}




  public setSelectableSettings(): void {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'single',
    };
}
  public state: State = {
    skip: 0,
    take: 5
  }

  //cambiar por que buscar 
  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.id;
  }


  change() {
    

}


/*
calificar(){
  if (this.codigo != undefined) {
  localStorage.setItem("idHecho", this.codigo);
  this.router.navigate(['/verificarHecho']);
  }else{
    alert("Debe seleccionar un hecho a verirficar")
  }
}

verificar(){
  if (this.codigo != undefined) {
    localStorage.setItem("idHecho", this.codigo);
    this.router.navigate(['/listarComponentes']);
    }else{
      alert("Debe seleccionar un hecho a verificar")
    }
 
}


  cancelar() {
    this.router.navigate(['/']);
  }
/*
  public asignarCarreraAsignatura(){
    this.selector=1;
    this.carreraAsignatura();
  }*/
/*
  public hechoVerificar() {
    if (this.codigo != undefined) {
      localStorage.setItem('listarComponentes', this.codigo);
      //if(this.selector==1)
      this.router.navigate(['/verificarhecho']);
    }
    //else
     // alert('Debe seleccionar una carrera para continuar.');
  }*/


}
