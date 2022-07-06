import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobsDataService } from '../jobs-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm!: FormGroup;
  formBuilder!: FormBuilder
  
  constructor(private jobService: JobsDataService) {
    this.formBuilder = new FormBuilder();
    this.editForm =  this.formBuilder.group({
      title: "", salary: "", description: "", address:"", skills:"", experience:""
    });
  }

  ngOnInit(): void {

  }

  fullUpdate(form: FormGroup): void {
    console.log("data submited successfuly from fullUpdate");
    
    this.jobService.update(form).subscribe((response) => console.log(response), (error)=> console.log(error));
    
    
    console.log("registrationForm",/*this.registrationForm.value*/form.value);
    
  }

}
