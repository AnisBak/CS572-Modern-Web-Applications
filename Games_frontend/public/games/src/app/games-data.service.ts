import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Game } from './games/games.component';


@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  baseUrl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }


  public getGames(): Observable<Game[]>{
    const url: string = this.baseUrl + "/games";
    
    return this.http.get<Game[]>(url);
     
  }
  
  public getGame(id: string): Observable<Game>{
    const url: string = this.baseUrl + "/games/" + id;
    return this.http.get<Game>(url);
  }
}
