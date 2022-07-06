import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlbumsDataService } from '../albums-data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private albumService: AlbumsDataService) {
    this.registrationForm = /*new*/ formBuilder.group({
      id:"",title: "", year: "", artist: ""
    });
  }

  ngOnInit(): void {
  }

  delete(form: FormGroup): void {
    console.log("data submited successfuly from delete");
    this.albumService.delete(form).subscribe({
      next: (response) => {
        alert("Album Deleted: "+response.title);
      },
      error: (error) => {
        alert("Deleting Album Error"+error);

      },
      complete: () => {
        console.log("Done");
        this.ngOnInit();
        
      }

    });
    console.log("registrationForm",/*this.registrationForm.value*/form.value);
    
  }
}
