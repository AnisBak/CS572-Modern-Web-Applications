import { Component, OnInit } from '@angular/core';
import { FlightServiceService } from '../flight-service.service';


export class Flight {
  #_id!: string;
  #name!: string;
  #src_airport!: string;
  #dst_airport!: string;

  get _id() {
    return this.#_id;
  }
  get name() {
    return this.#name;
  }
  get src_airport() {
    return this.#src_airport;
  }
  get dst_airport() {
    return this.#dst_airport;
  }

  constructor(id: string, name: string) {
    this.#_id = id;
    this.#name = name;
  }
}



@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})




export class FlightsComponent implements OnInit {
  flights: Flight[]= []
  constructor(private flightService: FlightServiceService) { }

  ngOnInit(): void {
    console.log("flight component executing");
    this.flightService.getFlights().subscribe( flights => this.flights=flights);
    
  }

}
