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
  @ViewChild("loginForm")// this is created before the page that's why we can't initiate because onInit is executed before the page is loaded
  loginForm!: NgForm;


  userCredentials: Credentials;

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }
  
  name: string = "";
  error: string = "";

  constructor(private _router: Router, private usersService: UsersService,  private authenticationService: AuthenticationService) {
    this.userCredentials = new Credentials();

    // this.loginnForm.setValue({ "username":"Jack"});
    // this.loginnForm.setValue({ "password": "113" });
  }// can't inject the ngform because it's not created like dataService 

  ngOnInit(): void {
    // setTimeout(() => {
    //   }, 0);
  }
  login(): void { // we used binding that's why we don't the ngForm anymore

    this.authenticationService.isLoggedIn = false;

    console.log("Form.value", this.loginForm.value);
    this.userCredentials.fillFromNgForm(this.loginForm);
    this.usersService.login(this.userCredentials).subscribe({
      next: (response) => {
        console.log("response", response);

        this.authenticationService.token = response.token;
        
        this.name = this.authenticationService.name;
        
        this.authenticationService.isLoggedIn = true;

      },
      error: (error) => {
        console.log("response", error);
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
