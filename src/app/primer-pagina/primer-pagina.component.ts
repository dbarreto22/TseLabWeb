import { Component, OnInit } from '@angular/core';

//import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { State, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { SelectableSettings, RowArgs, PageChangeEvent } from "@progress/kendo-angular-grid";

import { Observable, BehaviorSubject } from "rxjs";
import { Hechos } from 'src/app/Usuarios/clases/hechos';
import { HechosImg } from 'src/app/Usuarios/clases/hechosImg';
import { ApiServiceService } from '../api-service.service';
import { StorageService } from '../storage.service';
import { Preview } from '../Usuarios/clases/Preview';
import { checkAndUpdateElementDynamic } from '@angular/core/src/view/element';


@Component({
  selector: 'app-primer-pagina',
  templateUrl: './primer-pagina.component.html',
  styleUrls: ['./primer-pagina.component.scss']
})
export class PrimerPaginaComponent implements OnInit {

  public id;
  public titulo;
  public subbmiter;
  public url;
  public usuarioAlta;
  public hechos: Observable<Array<HechosImg>>;
  public hechosImagenes : BehaviorSubject<Array<HechosImg>> = new BehaviorSubject<Array<HechosImg>>([]);
  public hechosCard = new Array<HechosImg>();
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public dialogOpened = false;
  public hecho = new HechosImg();

  constructor(private apiService: ApiServiceService, private storage: StorageService) 
  {
    this.hechosImagenes.subscribe(items=>{
      console.log('LPM');
      console.log(items);
      console.log(this.hechosCard);
      this.hechosCard=items;
    },err=>console.log(err))
  //  this.inicializarlista(this.hechosImagenes);
    this.hechos = this.apiService.gethechosByEstadosImg("PUBLICADO");
    this.hechos.subscribe
    (
      (res) => 
    { console.log('servicio getHEchos')
    console.log(res);
      /*   res.forEach(element => {
          this.apiService.getPreview(element.url).subscribe(
            (respuesta: Preview) => {
              console.log(element);
              console.log('Entre al preview');
              console.log(respuesta.image);
              if(respuesta.image=="")
                element.img="assets/1024px-No_image_available.svg.png";
              else
                element.img = respuesta.image;
          console.log('element.image after load');
          console.log(element.img);
         });
        },err=>
        console.log(err)*/
// /*        
        this.hecho.clear();
        res.forEach(element => {
          console.log('elemento de hechos');
          console.log(element);
          console.log('llegara?')
          this.apiService.getPreview(element.url).subscribe(
            (respuesta: Preview) => {
              if(respuesta.image=="")
                element.img="assets/1024px-No_image_available.svg.png"
              else
                element.img = respuesta.image;
                console.log('adding element')
                //this.addElement(element);
                this.hechosImagenes.next(res);
            },
            err=>{console.log(err);
            element.img="assets/1024px-No_image_available.svg.png";
            console.log('adding element');
            this.hechosImagenes.next(res);
          }
            );
        });

      },
      ee => {
        console.log(ee)
  //  */  
         
         console.log('********PrimerPagina- getHechos : hechosImagenes - FIN ForEach ');
         this.hechos.forEach(as=>console.log(as.values()));

        }
    )
    console.log('********PrimerPagina- getHechos : hechosImagenes - FIN ');
    console.log(this.hechos);
    // this.cargarPreview()
      }
    

  ngOnInit() {
    this.storage.setRol(localStorage.getItem('rol'));
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: this.checkboxOnly,
      mode: "single"
    };
  }
  public skip = 0;
  public state: State = {
    skip: 0,
    take: 5
  }


  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.id;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {
    this.hechos.subscribe(
      (data: Array<Hechos>) => {
        data.forEach(hecho => {
          if (hecho.id == this.mySelection[0]) {
            this.id = hecho.id;
            this.titulo = hecho.titulo;
            console.log("***************IDHECHO********************");
            console.log(this.id);
            localStorage.setItem("idHecho", this.id);
          }
        })

      },
      err => {
        console.error("Se rompe en hechos.component", err);
        //this.apiService.mensajeConError(err);
      }
    )
  }

  inicializarlista(aux:Array<HechosImg>){
    aux.length=0;
  }
  cargarPreview() {
  /*  let grabity = require("grabity");
 
    (async () => {
      let it = await grabity.grabIt("https://github.com/e-oj/grabity");
     
      console.log(it);
    })();
  */}

  addElement(item){
    console.log('addElement')
    console.log(item);
    console.log('HechosCardAntes')
    console.log(this.hechosCard);
    this.hechosImagenes.next(item);
  }
}
