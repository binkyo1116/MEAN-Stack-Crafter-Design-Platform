import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import  { HomepageComponent} from './homepage/homepage.component'
import { LandingpageComponent  } from "./landingpage/landingpage.component";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ProfileformComponent} from './profileform/profileform.component';
import { AuthGuardGuard} from './auth-guard.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { BloghomeComponent } from './blog/bloghome/bloghome.component';
import { BlogformComponent } from './blog/blogform/blogform.component';
import { BlogdetailComponent } from './blog/blogdetail/blogdetail.component';
const routes: Routes = [

  {path:'homepage',component:HomepageComponent, canActivate:[AuthGuardGuard]},
  {path:'landingpage',component:LandingpageComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'profileform',component:ProfileformComponent},
  {path:'profilepage',component:ProfilePageComponent},
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },

  // blog routes

  {path:'blog',component:BloghomeComponent},
  {path:'blogform',component:BlogformComponent},
  {path:'blogdetail/:id',component:BlogdetailComponent},
  { path: '', redirectTo: '/landingpage', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
