import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable()
export class AuthorizatedGuard implements CanActivate {

  constructor(private router: Router,private storage : StorageService) { }

  canActivate() {
    if (this.storage.usrLogged) {
      return true;
    }
 
    this.router.navigate(['/login']);
    return false; 
  }
}
