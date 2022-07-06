import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
 

  constructor(private formBuilder: FormBuilder, private userService:UsersService, private authenticationService: AuthenticationService) {
    this.registrationForm = this.formBuilder.group({
      name: "", username: "", password: "", repassword:""
    });
  }

  ngOnInit(): void {

  }

  register(): void {
    const newUser: Credentials = new Credentials();
    if (newUser.fillFromForm(this.registrationForm)) {
      this.userService.register(newUser).subscribe(
        {
          next: () => {
            this.successMessage = environment.user_created_message;
            this.haveSuccess = true;
            this.haveError = false;
          },
          error: () => {
            this.errorMessage =environment.erro_creating_user ;
            this.haveSuccess = false;
            this.haveError = true;
          },
          complete: () => {
          
          }
        }
      );
    }
    else {
      alert(environment.password_mismatch);
    }
  }

 

}
