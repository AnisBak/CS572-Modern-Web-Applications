import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { AlbumsComponent } from './albums/albums.component';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';
import { AlbumComponent } from './album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    AlbumsComponent,
    StarsRatingComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "albums",
        component:AlbumsComponent
      },
      {
        path: ":albumId",
        component: AlbumComponent
      },   

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
