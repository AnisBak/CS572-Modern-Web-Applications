import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Credentials } from '../login/login.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  successMessage!: string;
  errorMessage!: string;
  haveSuccess: boolean = false;
  haveError: boolean = false;
  registrationForm!: FormGroup;

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }
 

  constructor(private _router: Router, private formBuilder: FormBuilder, private userService:UsersService, private authenticationService: AuthenticationService) {
    this.registrationForm = this.formBuilder.group({
      name: "", username: "", password: "", repassword:""
    });
  }

  ngOnInit(): void {

  }

  register(): void {
    console.log("registrationForm", this.registrationForm.value);
    const newUser: Credentials = new Credentials();
    if (newUser.fillFromForm(this.registrationForm)) {
      this.userService.register(newUser).subscribe(
        {
          next: () => {
            this.successMessage = "User Created";
            this.haveSuccess = true;
            this.haveError = false;
          },
          error: () => {
            this.errorMessage = "Error Creating user";
            this.haveSuccess = false;
            this.haveError = true;
          },
          complete: () => {
          
          }
        }
      );
    }
    else {
      alert("Passwords not matching");
    }
  }

 

}
