import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {  
  #isLoggedIn: boolean = false;
  logout() {
    localStorage.clear();
  }

  set token(token: any) {
    localStorage.setItem(environment.token_storage_key, token as string);
    this.isLoggedIn = true;
  }
  get token() {
    return localStorage.getItem(environment.token_storage_key);
  }
  get name() { 
    let name: string = environment.unkown_name;
    if (this.token) {
      name = this.jwtService.decodeToken(this.token).name;
    }
    return name;
  }
  
  get isLoggedIn() { return this.#isLoggedIn; }
  set isLoggedIn(isLoggedIn) { this.#isLoggedIn = isLoggedIn; }
  
  constructor(private jwtService: JwtHelperService) { }
}
