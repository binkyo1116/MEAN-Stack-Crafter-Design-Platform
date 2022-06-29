import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {BlogService} from '../../services/blog.service'
import {UserInfoService} from '../../services/user-info.service';
import {BlogreactionService} from '../../services/blogreaction.service';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-blogdetail',
  templateUrl: './blogdetail.component.html',
  styleUrls: ['./blogdetail.component.scss']
})
export class BlogdetailComponent implements OnInit {
  allblogs:any;
  CurrentUser:any;
  panelOpenState=false
  CurrentBlog:any="";
  Likes:any;
  likeColor="rgba(44, 44, 44, 0.514)"
  dislikeColor="rgba(44, 44, 44, 0.514)"
  
  
  mycomment=(id)=>{
      if(id===this.CurrentUser._id){
        return true;
      }else{
        return false;
      }
  };
  constructor(private route: ActivatedRoute,private _bottomSheet: MatBottomSheet,
    private location: Location,private blogService :BlogService,private UserService:UserInfoService,private Blogreaction:BlogreactionService) { }
  ngOnInit(): void {
    this.getCurrentBlog();
    this.getCurrentUser();
  }
   comment:String=null;

   getCurrentUser(){
    this.UserService.GetUserInfo().subscribe((user)=>{

      this.CurrentUser = user[0]
      console.log(this.CurrentUser);
      
     },(err)=>{
       console.log(err)
     })
   }

   likeBlog(){
    let likesarray=this.CurrentBlog.b_likes;
   
    const present=likesarray.some((like)=>{
     return like.postedBy._id===this.CurrentUser._id
    })
    
if(present){

}else{
  this.Blogreaction.PutLike(this.CurrentBlog._id).subscribe((res)=>{
    this.getCurrentBlog();
    this.likeColor="#fff"
    this.dislikeColor="rgba(44, 44, 44, 0.514)"
   }) 
}
  }

   dislikeBlog(){
    this.Blogreaction.RemoveLike(this.CurrentBlog._id).subscribe((res)=>{
      this.getCurrentBlog();
      this.likeColor="rgba(44, 44, 44, 0.514)"
      this.dislikeColor="#fff"
     })
   }



  getCurrentBlog(){
    const id = this.route.snapshot.params['id'].toString();
    this.blogService.getallBlogs().subscribe((blogs) => {
       this.allblogs=blogs;
     this.CurrentBlog=this.allblogs.filter((blog)=>{
       return blog._id==id;
  })[0]

   this.Likes=this.CurrentBlog.b_likes.length;
    })
  }  



 
  addComment(){
  console.log(this.comment)
 if(this.comment!='' && this.comment!==null){
  this.Blogreaction.PutComment(this.comment,this.CurrentBlog._id).subscribe((res)=>{
    console.log(res)
    this.getCurrentBlog()
  })
 }
  }


  deleteComment(comment:String){
console.log(comment)
console.log(this.CurrentBlog._id)
this.Blogreaction.DeleteComment(comment,this.CurrentBlog._id).subscribe((result)=>{
  console.log(result)
  this.getCurrentBlog()
},(err)=>{console.log(err)})
  }

}
