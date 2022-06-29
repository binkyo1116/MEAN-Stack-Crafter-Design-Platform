import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

   apiURL="http://localhost:3000";

  constructor(private http: HttpClient) { }

  registerUser(user){
    return this.http.post(`${this.apiURL}/signup`,user);
  }
  loginUser(user){
    return this.http.post(`${this.apiURL}/signin`,user);
  }
  
  getToken(){
    return localStorage.getItem('token');
  }


  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }
}
