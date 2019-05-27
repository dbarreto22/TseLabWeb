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


  constructor(private router: Router, private apiService : ApiServiceService) { }

  ngOnInit() {
    
  }


  Usuario(){
    this.router.navigate(['/login']);
  }

  Visitante(){
    this.router.navigate(['/paginaPrincipal']);
  }

  Citizen(){
    this.router.navigate(['/loginRedSocial']);
  }

}
