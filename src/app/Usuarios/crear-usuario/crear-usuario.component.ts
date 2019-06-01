import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../api-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { Admin } from '../clases/admin';
import { Submiter } from '../clases/submiter';
import { Checker } from '../clases/checker';



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
  constructor(public http: HttpClient, private apiService: ApiServiceService,private router: Router) {}

  ngOnInit() {
    /*let rolElegido = localStorage.getItem('rolElegido');
    if (rolElegido != '1') {
      alert('El rol actual no puede acceder a esta función.');
      this.router.navigate(['/'])
    }*/
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
      this.user.contrasenia = cip;
      this.user.telefono = telefono;
      this.user.nickname = nickname;
      this.user.rol = "Admin";
      console.log(this.user)
      
      this.apiService.crearUser(this.user);
      
    }else{
      this.user.nombre = nombre;
      this.user.email = mail;
      this.user.contrasenia = cip;
      this.user.telefono = telefono;
      this.user.nickname = nickname;
      this.user.rol = this.rol;
      console.log(this.user)
      
      this.apiService.crearUser(this.user);

    }
    
  }

  public cancelar(){
    this.router.navigate(['/']);


  }

  

}