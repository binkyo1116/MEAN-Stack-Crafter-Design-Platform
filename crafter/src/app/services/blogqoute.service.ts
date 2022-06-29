import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogqouteService {


  constructor(private http: HttpClient) { }

 ApiUrl ='http://localhost:3000/b_qoutes'

  GetBlogQoute(){
    return this.http.get(this.ApiUrl);
  }

}
