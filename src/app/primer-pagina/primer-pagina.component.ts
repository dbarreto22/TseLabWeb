import { Component, OnInit } from '@angular/core';

//import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { State, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { SelectableSettings, RowArgs, PageChangeEvent } from "@progress/kendo-angular-grid";

import { Observable } from "rxjs";
import { Hechos } from 'src/app/Usuarios/clases/hechos';
import { ApiServiceService } from '../api-service.service';
import { StorageService } from '../storage.service';

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
  public hechos: Observable<Array<Object>>;
//  public hechos;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public dialogOpened = false;
  constructor(  private apiService: ApiServiceService, private storage:StorageService) {
      this.hechos = this.apiService.gethechosByEstados("VERIFICADO");
      this.hechos.subscribe(
        (res) =>{ console.log(res)},
        ee => {
           console.log(ee)
        }
      )

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
            localStorage.setItem("idHecho",this.id);
          }
        })

      },
      err => {
        console.error("Se rompe en hechos.component",err);
        //this.apiService.mensajeConError(err);
      }
    )
  }


}
