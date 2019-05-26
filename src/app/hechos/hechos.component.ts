import { Component, OnInit } from '@angular/core';

//import { NgbPaginationConfig } from "@ng-bootstrap/ng-bootstrap";
import { State, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { SelectableSettings, RowArgs, PageChangeEvent } from "@progress/kendo-angular-grid";
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
//import { Observable } from "rxjs";


@Component({
  selector: 'app-hechos',
  templateUrl: './hechos.component.html',
  styleUrls: ['./hechos.component.scss']
})
export class HechosComponent implements OnInit {
  public checked = false;
  public filter: CompositeFilterDescriptor;
  selectedValue: any[];
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public dialogOpened = false;

  constructor(  private apiService: ApiServiceService,
    private router: Router
  ) {
    
   }

  ngOnInit() {
  }

}
