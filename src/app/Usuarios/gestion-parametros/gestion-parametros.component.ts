import { Component, OnInit } from '@angular/core';
import { SelectableSettings, RowArgs, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { State } from '@progress/kendo-data-query';
import { Parametro } from '../clases/parametro';

@Component({
  selector: 'app-gestion-parametros',
  templateUrl: './gestion-parametros.component.html',
  styleUrls: ['./gestion-parametros.component.scss']
})
export class GestionParametrosComponent implements OnInit {

  public dialogOpened = false;
  public selector;
  public checkboxOnly = true;
  public selectableSettings: SelectableSettings;
  public name;
  public value;
  public loading;
  public skip = 0;
  public parametros : Observable<Array<any>>;

  constructor(public http: HttpClient, private router: Router, private apiService:ApiServiceService) { 
    this.setSelectableSettings();

    this.parametros = this.apiService.getParametros();
    this.parametros.subscribe(
      ()=> {
        console.log(this.parametros)
        this.loading=false
      },
      err=>{
        this.loading=false;
      }
    )
      
  }

  ngOnInit() {
   
  }

  public setSelectableSettings(): void {
    this.selectableSettings = {
        checkboxOnly: this.checkboxOnly,
        mode: 'single',
    };
}
  public state: State = {
    skip: 0,
    take: 5
  }

  //cambiar por que buscar 
  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    return context.dataItem.name;
  }

  public pageChange(event: PageChangeEvent): void {
    console.log(this.mySelection[0]);
    this.skip = event.skip;

  }

  change() {
   
    this.parametros.subscribe(
    (data: Array<Parametro>)=> {
      console.log(data)
      data.forEach(asig=>{
        if(asig.name == this.mySelection[0]){
          this.name= asig.name;
          this.value = asig.value;
        }
        console.log('codigo ',this.name)
      })
      
    },
    err=>{
      console.log(err);
    }
  )


}

modificarParametro(){
  if (this.name != undefined) {
  localStorage.setItem("name", this.name);
  this.router.navigate(['/modificarParametro']);
  }else{
    alert("Debe seleccionar un hecho a verificar")
  }
}

crearParametro(){
  this.router.navigate(['/crearParametro']);
}




  public eliminarParametro() {
    this.dialogOpened = true;
  }


  public confirmarEliminarParametro() {
    
    if (this.name != undefined) {
      console.log(this.name);
      this.apiService.borrarParametro(this.name, this.value).subscribe( (res) => {console.log(res)
        },
        err => {
          
        });
        //this.router.navigate(['/gestionParametros']);
        this.dialogOpened = false;
        this.parametros = this.apiService.getParametros();
        this.parametros.subscribe(()=> {},err=>{});
        
    }
    else
      alert('Debe seleccionar una carrera para continuar.');
 }

}
