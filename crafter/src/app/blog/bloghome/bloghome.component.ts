import { Component, OnInit } from '@angular/core';
import {BlogqouteService } from '../../services/blogqoute.service'
import {BlogService} from '../../services/blog.service'
@Component({
  selector: 'app-bloghome',
  templateUrl: './bloghome.component.html',
  styleUrls: ['./bloghome.component.scss']
})
export class BloghomeComponent implements OnInit {

  constructor(private BlogQoute:BlogqouteService ,private BlogService: BlogService    ) { }

  Qoutes:any='';
TodaysQoutes:any='';
colorpallete:any={
  bg:'',
  color:''
};

  RandomeQoute(){
    let todaysQoutes=Math.floor(Math.random() * this.Qoutes.length);
   let colors=[
      {bg:'#e63946',color:'#f1faee'},
      {bg:'#d69f7e',color:'#f1faee'},
      {bg:'#003049',color:'#f1faee'},
      {bg:'#f77f00',color:'#f1faee'},
      {bg:'#ffafcc',color:'#f1faee'},
      {bg:'#6930c3',color:'#f1faee'},
      {bg:'#d00000',color:'#f1faee'},
      {bg:'560bad',color:'#fff'}
  ]
  let randomColor =Math.floor(Math.random() * colors.length);
    this.colorpallete.bg=colors[randomColor].bg;
  this.colorpallete.color=colors[randomColor].color;
console.log(this.colorpallete,'pallete')
    console.log(this.Qoutes[todaysQoutes],'today qoite') 
    this.TodaysQoutes=this.Qoutes[todaysQoutes];
  }


Blogs:any;

getOnlythree(n=0){

  console.log(this.Blogs.slice(n,n+3))
}


  ngOnInit(): void {

  
    this.BlogQoute.GetBlogQoute().subscribe((res)=>{
    
      this.Qoutes=res;
      console.log(this.Qoutes)
      this.RandomeQoute()
    })


    this.BlogService.getallBlogs().subscribe((res)=>{
      this.Blogs=res
console.log(this.Blogs);  
    })
   




    
  }

}
