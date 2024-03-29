import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { Admin } from '../clases/admin';
import { Submiter } from '../clases/submiter';
import { Checker } from '../clases/checker';
import { StorageService } from 'src/app/storage.service';



@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  public roles: Array<string> = ["Administrador", "Submitter", "Checker"];
  public rol : string;
  public user = new Usuario();
  public validEmail :boolean;
  constructor(public http: HttpClient, private apiService: ApiServiceService, 
   private storage:StorageService, private router: Router) {}

  ngOnInit() {
    if(localStorage.getItem('rol')!='ADMIN')
    {
      console.log('Mecanismos- El usuario no tiene los permisos suficientes para acceder a esta funcionalidad');
      this.router.navigate(['/'])
    }
  }

  public crearUsuario(nombre,nickname, mail,telefono,password) {
    var crypto = require('crypto'); //Libreria de criptografia
    var cipher = crypto.createCipher('aes256', 'pass'); // tipo de cifrado y password
    var data = password;
    cipher.update(data, 'utf8', 'hex'); // cifro la contraseña
    var cip = cipher.final('hex'); //Cifrado
    console.log("Encrypted data = " + cip);
    
    if (this.rol == "Administrador"){
      this.user.nombre = nombre;
      this.user.email = mail;
      this.user.password = cip;
      this.user.telefono = telefono;
      this.user.nickname = nickname;
      this.user.rol = "ADMIN";
      console.log(this.user)
      
      this.apiService.crearUser(this.user).subscribe((res)=> {
        console.log("RESP",res);
        this.storage.hayError(res);
        this.router.navigate(['/principalAdmin']);
      },
      err=>{
        console.log("ERROR",err);
        this.storage.manejarError(err);
      }
      )
      
    }else {
      this.user.nombre = nombre;
      this.user.email = mail;
      this.user.password = cip;
      this.user.telefono = telefono;
      this.user.nickname = nickname;
      this.user.rol = this.rol.toUpperCase();
      console.log(this.user)
      
      this.apiService.crearUser(this.user).subscribe((res)=> {
        alert("Se ha creado correctamente.")
        this.router.navigate(['/principalAdmin']);
      },
      err=>{
        console.log("ERROR",err);
       
        
      }
      );

    }
    
  }

  public cancelar(){
    this.router.navigate(['/']);
  }

  

}