import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlbumsDataService } from '../albums-data.service';

@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.css']
})
export class EditDeleteComponent implements OnInit {

  registrationForm!: FormGroup;
  formBuilder!: FormBuilder
  
  constructor(private albumService: AlbumsDataService) {
    this.formBuilder = new FormBuilder();
    this.registrationForm =  this.formBuilder.group({
      id:"",title: "", year: "", artist: ""
    });
  }

  ngOnInit(): void {

  }

  fullUpdate(form: FormGroup): void {
    console.log("data submited successfuly from fullUpdate");
    
    this.albumService.update(form).subscribe({
      next: (response) => {
        alert("Album updated: "+response.title);
      },
      error: (error) => {
        alert("Updating Album Error"+error);

      },
      complete: () => {
        console.log("Done");
        this.ngOnInit();
        
      }

    });
    
    
    console.log("registrationForm",/*this.registrationForm.value*/form.value);
    
  }
}
