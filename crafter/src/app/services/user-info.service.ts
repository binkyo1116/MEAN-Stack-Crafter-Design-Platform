import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {


  constructor(private http:HttpClient) { }
  apiURL="http://localhost:3000";


  GetUserInfo(){
 return this.http.get(this.apiURL+"/getUser")
  }
}
