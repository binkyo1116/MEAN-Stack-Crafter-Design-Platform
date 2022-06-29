import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  ApiUrl="http://localhost:3000/blog"  

  getallBlogs(){

return this.http.get(this.ApiUrl)

  }

}
