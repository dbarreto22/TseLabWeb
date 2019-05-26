import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { State } from '@progress/kendo-data-query';
import { RowArgs, PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-verificar-hecho',
  templateUrl: './verificar-hecho.component.html',
  styleUrls: ['./verificar-hecho.component.scss'],
  providers: [NgbPaginationConfig, ApiServiceService],
})
export class VerificarHechoComponent implements OnInit {

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) { }

  ngOnInit() {
  }
  



}
