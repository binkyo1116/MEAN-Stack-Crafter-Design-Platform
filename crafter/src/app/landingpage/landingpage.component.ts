import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  constructor(private authentication:AuthenticationService,private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit(): void {


  }

  
  onlogout(){
   this.authentication.logout();
   this._snackBar.open('logout successfull', 'X',{
    duration: 2000
  });
  }

  
}
