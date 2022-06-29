import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthenticationService} from './services/authentication.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor(private authservice: AuthenticationService,private router:Router) { }

  intercept(req,next) {
    let tokenizedrequest = req.clone({

     
      setHeaders:{
Authorization:`${this.authservice.getToken()}` 
      }
    });
    return next.handle(tokenizedrequest)
  }
  
}
