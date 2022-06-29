import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  User={
    firstName:'',
	lastName:'',
	userName:'',
	email:'',
	password:'',
	whoAreYou: ''
  }

  Options=['Web Designer','Software Developer','Graphics Designer','Product Designer','Illustrator','UI UX Designer',]

 
  constructor(private AuthService:AuthenticationService,private _snackBar: MatSnackBar,private router: Router) { }
  
  ngOnInit(): void {

  }

errMsg

onsignup(){

 console.log(this.User);

 this.AuthService.registerUser(this.User).subscribe((result)=>{
   console.log(result);
   this._snackBar.open('Signup Successfull !! Please Login To Continue', 'X');
   this.router.navigateByUrl('/login');
 },(err)=>{
this.errMsg=err.error;
console.log()
this._snackBar.open(this.errMsg.error, 'X');
 })



}
  
}
