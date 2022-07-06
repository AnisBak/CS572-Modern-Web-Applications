import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class FactsDataService {

  private  baseUrl = "https://uselessfacts.jsph.pl";

  constructor(private http: HttpClient) { }


  public getFacts(): Observable<any>{
    return this.http.get(this.baseUrl + "/random.json?language=en");
  }
}
