import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-primer-pagina',
  templateUrl: './primer-pagina.component.html',
  styleUrls: ['./primer-pagina.component.scss']
})
export class PrimerPaginaComponent implements OnInit {

  public devolucion: Observable<any>;
  public mostrar :string;

  constructor(private router: Router, private apiService : ApiServiceService) { }

  ngOnInit() {
   this.devolucion = this.apiService.prueba();
   console.log(this.devolucion);
   this.devolucion.subscribe(
    (data) => {
      console.log("this.mostrar");
      this.mostrar = data;
      console.log(this.mostrar);
    });
   
    
  }


  Usuario(){
    this.router.navigate(['/login']);
  }

  Visitante(){
    this.router.navigate(['/paginaPrincipal']);
  }

}
