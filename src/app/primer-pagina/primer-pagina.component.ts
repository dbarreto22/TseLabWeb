import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-primer-pagina',
  templateUrl: './primer-pagina.component.html',
  styleUrls: ['./primer-pagina.component.scss']
})
export class PrimerPaginaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  Usuario(){
    this.router.navigate(['/login']);
  }

  Visitante(){
    this.router.navigate(['/paginaPrincipal']);
  }

}
