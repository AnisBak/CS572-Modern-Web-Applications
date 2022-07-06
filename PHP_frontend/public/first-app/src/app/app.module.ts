import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt'; 


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AlbumsComponent } from './albums/albums.component';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { AlbumComponent } from './album/album.component';

import { addComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EditDeleteComponent } from './edit/edit-delete.component';
import { DeleteComponent } from './delete/delete.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    AlbumsComponent,
    StarsRatingComponent,
    AlbumComponent,
    addComponent,
    LoginComponent,
    EditDeleteComponent,
    DeleteComponent,
    RegisterComponent,
    ProfileComponent,
    
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "profile",
        component: ProfileComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "delete",
        component: DeleteComponent
      },
      {
        path: "editDelete",
        component: EditDeleteComponent
      },
      {
        path: "albums",
        component: AlbumsComponent
      },{
        path: "add",
        component: addComponent
      },
      {
        path: ":albumId",
        component: AlbumComponent
      }
     
      

    ])
  ],
  providers: [{provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
