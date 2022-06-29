import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  constructor(private AuthService:AuthenticationService,private _snackBar: MatSnackBar,private router: Router) { }
  User={
    userName:'',
    email:'',
    password:'',
  }
  errMsg
  ngOnInit(): void {
  }


 

result:any;
  Login(){
    this.AuthService.loginUser(this.User).subscribe((res) =>{
   this.result= res;
  localStorage.setItem('id',this.result.user._id);
console.log(this.result.token)
localStorage.setItem('token',this.result.token);

// localStorage.setItem()
      this._snackBar.open('login Successfull', 'X',{
        duration: 2000
      });
       
      this.router.navigateByUrl('/homepage');
    },(err) =>{
      this.errMsg=err.error;
      console.log()
      this._snackBar.open(this.errMsg.error, 'X',{
        duration: 2000
      });
    })
  }


}

