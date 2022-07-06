import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../authentication.service';


import { UsersService } from '../users.service';



export class Credentials {


  #_name!: string;
  #_username!: string;
  #_password!: string;
  #_token!: string;

  get username() { return this.#_username }
  get password() { return this.#_password }
  get name() { return this.#_name }
  get token() { return this.#_token }
  set username(username) { this.#_username = username; }
  set password(password) { this.#_password = password; }

  fillFromForm(form: FormGroup):boolean {
    if (form.value.password === form.value.repassword) {
      this.#_name = form.value.name;
      this.#_username = form.value.username;
      this.#_password = form.value.password;
      return true;
    }
    else {
      return false;

    }
    
  }

  fillFromNgForm(form: NgForm) {

    this.#_username = form.value.username;
    this.#_password = form.value.password;

  }

  json(): any {
    return {
      name: this.name,
      username: this.username,
      password: this.password

    }
  }

}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("loginForm")
  loginForm!: NgForm;


  userCredentials: Credentials;

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }
  
  name: string = "";
  error: string = "";

  constructor( private usersService: UsersService,  private authenticationService: AuthenticationService) {
    this.userCredentials = new Credentials();

    
  }

  ngOnInit(): void {
    
  }
  login(): void { 

    this.authenticationService.isLoggedIn = false;
    this.userCredentials.fillFromNgForm(this.loginForm);
    this.usersService.login(this.userCredentials).subscribe({
      next: (response) => {
        this.authenticationService.token = response.token;
        this.name = this.authenticationService.name;
        this.authenticationService.isLoggedIn = true;
      },
      error: (error) => {
        this.authenticationService.isLoggedIn = false;
        alert(error.error)
      },
      complete: () => {

      }
    });
  }

  logout(): void {
    this.authenticationService.isLoggedIn = false;
    this.authenticationService.logout();
    this.name = "";

  }

  

}
