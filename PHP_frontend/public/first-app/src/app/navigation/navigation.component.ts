import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  get isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  constructor(private _router: Router, private authenticationService: AuthenticationService) {

   }

  ngOnInit(): void {
    
  }
  onHome(): void {
    this._router.navigate(['']);
  }

  onAlbum(): void {
    this._router.navigate(['albums']);
  }

  onRegister(): void{
    this._router.navigate(['register']);
  }
  // onAdd(): void{
  //   this._router.navigate(['add']);
  // }
  // onEditDelete() {
  //   this._router.navigate(['editDelete']);
  // }

  // onDelete()
  // {
  //   this._router.navigate(['delete']);

  // }
  
  


}
