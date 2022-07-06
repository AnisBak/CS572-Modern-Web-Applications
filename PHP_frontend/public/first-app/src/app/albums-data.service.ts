import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';// external dependencies

import { Album } from './albums/albums.component';// internal dependencies
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AlbumsDataService {

  private  baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }


  public getAll(): Observable<Album[]>{
    return this.http.get<Album[]>(this.baseUrl + "/albums"); // we can cast inside the brackets
  }

  public getOne(id: string):Observable<Album> {
    const url: string = this.baseUrl + "/albums/" + id;
    return this.http.get<Album>(url);
  }
  
  public AddOne(album: FormGroup):Observable<Album> {
    console.log("in the addOne Method");
    let tokenString: string = "Bearer "+ this.authenticationService.token;
    const url: string = this.baseUrl + "/albums";
    return this.http.post<Album>(url, album.value,{headers:{'authorization': tokenString }} );
    
  }
  public AddOneSong(albumId:string, song: FormGroup):Observable<Album> {
    console.log("in the addOne Method");
    let tokenString: string = "Bearer "+ this.authenticationService.token;
    const url: string = this.baseUrl + "/albums/"+albumId+"/songs";
    return this.http.post<Album>(url, song.value,{headers:{'authorization': tokenString }} );
    
  }

  public update(album: FormGroup): Observable<any>{
    console.log("in the update method"+album.value.id);
    const url: string = this.baseUrl + "/albums/"+album.value.id;
    return this.http.patch(url, album.value);
  }

  public updateSong(albumId:string, song: FormGroup): Observable<any>{
    console.log("in the update method"+song.value.id);
    const url: string = this.baseUrl + "/albums/"+albumId+"/songs/"+ song.value.id;
    return this.http.patch(url, song.value);
  }

  public delete(album: FormGroup): Observable<any>{
    console.log("in the delete method"+album.value.id);
    const url: string = this.baseUrl + "/albums/"+album.value.id;
    return this.http.delete(url, album.value);
  }
  public deleteSong(albumId:string,song: FormGroup): Observable<any>{
    console.log("in the delete method "+song.value.id);
    const url: string = this.baseUrl + "/albums/" + albumId + "/songs/" + song.value.id;
    console.log(url);
    return this.http.delete(url, song.value);
  }


}
