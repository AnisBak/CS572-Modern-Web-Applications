import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';// external dependencies

import { Album } from './albums/albums.component';// internal dependencies


@Injectable({
  providedIn: 'root'
})
export class AlbumsDataService {

  private  baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }


  public getAll(): Observable<Album[]>{
    return this.http.get<Album[]>(this.baseUrl + "/albums"); // we can cast inside the brackets
  }

  public getOne(id: string):Observable<Album> {
    const url: string= this.baseUrl + "/albums/" + id;
    return this.http.get<Album>(url);
    }
}
