import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogreactionService {

  constructor(private http:HttpClient) { }
 CommentUrl ='http://localhost:3000/b_comment'


 PutComment(b_text,id){

  return this.http.put(this.CommentUrl,{b_text,blogId:id})
 }

 PutLike(blogId){
   return this.http.put('http://localhost:3000/b_like',{blogId})
 }

 RemoveLike(blogId){
  return this.http.put('http://localhost:3000/b_unlike',{blogId})
}

 DeleteComment(b_text,blogId){
   console.log(blogId)
   return this.http.put('http://localhost:3000/b_uncomment',{b_text,blogId})
 }
}
