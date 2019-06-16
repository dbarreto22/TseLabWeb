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
  private aux: Boolean;
  private aux2: Boolean;


  constructor(private storage:StorageService, private router:Router) {
    this.storage.select$().subscribe(logueado => {
      this.aux = logueado.valueOf();
        this.aux2 = !this.aux;
        console.log('sidenv-Bar logueado***************************')
        console.log(logueado)
      });
      this.aux = this.storage.usrLogged();
  }

  logOut() {
    this.storage.clearSession();
    this.router.navigate(['/bienvenido']);
  }

  ngOnInit() {
    this.storage.setRol(localStorage.getItem('rol'));
  }

  logIn() {
    this.router.navigate(['login']);
  }
  logInRedSocial() {
    this.router.navigate(['/loginRedSocial']);
  }

  donar() {
    this.storage.getAllHechos().subscribe(res => console.log(res));
  }

}
