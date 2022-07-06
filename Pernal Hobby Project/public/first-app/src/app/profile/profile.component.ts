import { Component, OnInit } from '@angular/core';
import { Credentials } from '../login/login.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  name!: string;
  
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.name = this.authenticationService.name

  }

}
