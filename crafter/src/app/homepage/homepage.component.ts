import { Component, OnInit } from '@angular/core';
import {ProfileUploadService}  from '../services/profile-upload.service'
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  CurrentUser:any=''; 
  constructor(private Profile:    ProfileUploadService    ) { }

  ngOnInit(): void {
    this.Profile.GetUser().subscribe((res)=>{
   
      this.CurrentUser=res[0];
      console.log(this.CurrentUser)
    })
  }

}
