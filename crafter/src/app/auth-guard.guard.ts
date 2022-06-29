import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthenticationService} from './services/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authservice: AuthenticationService,private router:Router){

  }
  canActivate():boolean{
    if(this.authservice.loggedIn())
    {
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
