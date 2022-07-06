import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  #isLoggedIn: boolean = false;
  // #token!: any;

  logout() {
    localStorage.clear();
  }

  set token(token: any) {
    console.log("set token done", token);
    
    localStorage.setItem("token key", token as string);
    this.isLoggedIn = true;
    // this.#token = token;
  }

  get token() {
    return localStorage.getItem("token key");

    // return this.#token;
  }
  
  get name() { 
    let name: string = "unkown";
    if (this.token) {
      name = this.jwtService.decodeToken(this.token).name;
    }
    return name;
  }
  
  get isLoggedIn() { return this.#isLoggedIn; }
  set isLoggedIn(isLoggedIn) { this.#isLoggedIn = isLoggedIn; }
  
  constructor(private jwtService: JwtHelperService) { }
}
