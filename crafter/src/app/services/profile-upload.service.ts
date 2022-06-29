import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';@Injectable({
  providedIn: 'root'
})
export class ProfileUploadService {

  constructor(private http: HttpClient) { }


 URL="http://localhost:3000"
  UpdateProfile(profilePic:string){
return this.http.put(`${this.URL}/updateProfilePic`,{profilePic});
  }
  
 PostProfile(bio,desc){
    return this.http.post(`${this.URL}/postProfileInfo`,{bio,desc})
  }

  GetProfile(){
    return this.http.get(`${this.URL}/getProfileInfo`)
  }

  GetUser(){
    return this.http.get(`${this.URL}/getUser`);
  }
}
