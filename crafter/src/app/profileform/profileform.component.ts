import { Component, OnInit } from '@angular/core';
import {ProfileUploadService} from '../services/profile-upload.service';
import {AngularFireStorage} from  '@angular/fire/storage';
@Component({
  selector: 'app-profileform',
  templateUrl: './profileform.component.html',
  styleUrls: ['./profileform.component.scss']
})

export class ProfileformComponent implements OnInit {

  constructor(private profileupload:ProfileUploadService,private AF:AngularFireStorage) { }

  ngOnInit(): void {
  }

bio:''
desc:''
   

   Profileurl=``
selectedFile
  onchange(ev){
   this.selectedFile = ev.target.files[0];
  }


  Myprofile={
    firstName:'',
    lastName:''
  }

  ProfileUrl='https://i.pinimg.com/originals/86/b9/4c/86b94c56b28e6bd8533320241440ddef.gif'
isLinear=true;
  onProfileUpload(){
    let userId=localStorage.getItem('id');
   var filepath=`ProfileImage/${userId}/profilepic`;
   const fileRef=this.AF.ref(filepath)

   this.AF.upload(filepath,this.selectedFile).then((res)=>{
    
     fileRef.getDownloadURL().subscribe((url)=>{
      console.log(url);
      this.ProfileUrl=url;

      this.profileupload.UpdateProfile(this.ProfileUrl).subscribe((res:any)=>{
        console.log(res,'this is res')
      },(error)=>{
        console.log(error,'this is error')
      })

    } ,(err)=>{
      console.log(err,'this is err')
    })
   }).catch(err => console.log(err))
  }


  // save profile


  
  



}
