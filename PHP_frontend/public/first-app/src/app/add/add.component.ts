import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


import { AlbumsDataService } from '../albums-data.service';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class addComponent implements OnInit {

  addForm!: FormGroup;
  formBuilder!: FormBuilder;
  constructor(private albumService: AlbumsDataService/*, private userService:UsersService*/) {
    this.formBuilder = new FormBuilder();
    this.addForm = this.formBuilder.group({
      title: "", year: "", artist: ""
    });


    // registrationForm = new FormGroup({
    // name: new FormControl("123"),
    // username: new FormControl("123", Validators.required),
    // password: new FormControl("123"),
    // repeatPassword: new FormControl("123")})

  }

  ngOnInit(): void {

  }

  add(form: FormGroup): void {
    console.log("In the add method");
    // this.userService.register({ name: this.registrationForm.value.name/*.....*/ }).subscribe();//or send the whole form
    this.albumService.AddOne(form).subscribe(
      {
        next: (response) => {
          console.log("Album added", response);
        },
        error: (error) => {
          console.log("Add Album Error", error);

        },
        complete: () => {
          console.log("Done");
          
        }

      });
    console.log("registrationForm",/*this.registrationForm.value*/form.value);

  }

}
