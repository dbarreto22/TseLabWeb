import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {


  constructor(private storage:StorageService) {


  }

  ngOnInit() {
    this.storage.setRol(localStorage.getItem('rol'));
  }


}
