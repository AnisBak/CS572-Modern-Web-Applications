import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { Flight } from './flights/flights.component';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FlightServiceService {

  baseUrl: string = "http://localhost:8080/api";
  constructor(private http: HttpClient) { }
  
  public getFlights(): Observable<Flight[]>{
    console.log(this.baseUrl);
    
    const url: string = this.baseUrl + "/flights";
    return this.http.get<Flight[]>(url);
    
  }
}
