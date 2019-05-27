import { Component, OnInit } from '@angular/core';

//import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { State, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { SelectableSettings, RowArgs, PageChangeEvent } from "@progress/kendo-angular-grid";
import { ApiServiceService } from '../../api-service.service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { products } from './products';


@Component({
  selector: 'app-hechos',
  templateUrl: './hechos.component.html',
  styleUrls: ['./hechos.component.css']
})
export class HechosComponent implements OnInit {
  public id;
  public titulo;
  public subbmiter;
  public url;
  public usuarioAlta;
  public hechos: Observable<Array<Object>>;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public dialogOpened = false;
  public gridData: any[] = products;
  constructor(  private apiService: ApiServiceService,
    private router: Router
  ) {
    
    this.hechos = this.apiService.getAllHechos();

    
   }

  ngOnInit() {
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
/*    this.asignaturas.subscribe(
      (data: Array<asignatura>) => {
        data.forEach(asig => {
          if (asig.codigo == this.mySelection[0]) {
            this.codigo = asig.codigo;
            this.nombreAsignatura = asig.nombre;
            console.log(this.codigo);

          }
        })

      },
      err => {
        this.apiService.mensajeConError(err);
      }
    )*/
  }


}
