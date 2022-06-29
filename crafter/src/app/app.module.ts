import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatBadgeModule} from '@angular/material/badge'; 
import {MatBottomSheetModule} from '@angular/material/bottom-sheet'; 
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatListModule} from '@angular/material/list'; 
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import { MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button'; 
import {MatRippleModule} from '@angular/material/core'; 
import {MatSelectModule} from '@angular/material/select';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component'; 
import {MatIconModule} from '@angular/material/icon'; 
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuardGuard} from './auth-guard.guard';
import {TokenInterceptorService} from './token-interceptor.service';
import { ProfileformComponent } from './profileform/profileform.component';
import {MatStepperModule} from '@angular/material/stepper'; 
import {AngularFireStorageModule} from "@angular/fire/storage"
import {AngularFireModule } from '@angular/fire';
import { ProfilePageComponent } from './profile-page/profile-page.component'
import { CarouselModule } from 'ngx-owl-carousel-o';

import { BloghomeComponent } from './blog/bloghome/bloghome.component';
import { BlogdetailComponent } from './blog/blogdetail/blogdetail.component';
import { BlogformComponent } from './blog/blogform/blogform.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    HeaderComponent,
    ProfileformComponent,
    ProfilePageComponent,
    BloghomeComponent,
    BlogdetailComponent,
    BlogformComponent,
  ],
  imports: [
AngularFireModule.initializeApp({
    apiKey: "AIzaSyBURMnlC8N3HEABhm0YsDDWVJALhBvRLG8",
    authDomain: "majorprojecr.firebaseapp.com",
    projectId: "majorprojecr",
    storageBucket: "majorprojecr.appspot.com",
    messagingSenderId: "585567558613",
    appId: "1:585567558613:web:c5e697643417c21cd77b5c",
    measurementId: "G-KV63S85BTN"
}),
AngularFireStorageModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    HttpClientModule,
    MatStepperModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatRippleModule,MatListModule,
    MatSliderModule,
    MatMenuModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatInputModule ,
    MatCardModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDialogModule,
    MatExpansionModule,

    CarouselModule 
  ],
  providers: [AuthGuardGuard,{
    provide:HTTP_INTERCEPTORS  ,
    useClass:TokenInterceptorService,
    multi: true
    }],
    entryComponents: [
     ProfileformComponent,
],
  bootstrap: [AppComponent]
})
export class AppModule { }
