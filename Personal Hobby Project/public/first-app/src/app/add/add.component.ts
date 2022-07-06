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
  constructor(private albumService: AlbumsDataService) {
    this.formBuilder = new FormBuilder();
    this.addForm = this.formBuilder.group({
      title: "", year: "", artist: ""
    });

  }
  ngOnInit(): void {

  }
  add(form: FormGroup): void {
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
  }

}
