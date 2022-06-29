import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from  '@angular/fire/storage';

@Component({
  selector: 'app-blogform',
  templateUrl: './blogform.component.html',
  styleUrls: ['./blogform.component.scss']
})
export class BlogformComponent implements OnInit {

  constructor(private AF:AngularFireStorage) { }
 
  b_title=''
     b_coverPhoto=''
     b_desc=''
     b_body=[
       {
        heading:'',
        para:[{
        text:''    
        }],
        image:''
       }
     ]

     b_post=''
    b_category=''
   
  ngOnInit(): void {

  }

  selectedFile:any=''
  onchange(ev){
    this.selectedFile = ev.target.files[0];
   }

  onSectionUpload(){
    let userId=localStorage.getItem('id');
   var filepath=`BlogImage/${userId}/Blogimage`;
   const fileRef=this.AF.ref(filepath)

   this.AF.upload(filepath,this.selectedFile).then((res)=>{
    
     fileRef.getDownloadURL().subscribe((url)=>{
      console.log(url);
   

    } ,(err)=>{
      console.log(err,'this is err')
    })
   }).catch(err => console.log(err))
  }


}
