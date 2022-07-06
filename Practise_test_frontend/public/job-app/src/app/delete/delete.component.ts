import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobsDataService } from '../jobs-data.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  deleteForm!: FormGroup;
  formBuilder!: FormBuilder

  constructor(private jobService: JobsDataService) {
    this.formBuilder = new FormBuilder();
    this.deleteForm = /*new*/ this.formBuilder.group({
      id:""
    });
  }

  ngOnInit(): void {
  }

  delete(form: FormGroup): void {
    console.log("data submited successfuly from delete");
    this.jobService.delete(form).subscribe((response) => console.log(response), (error)=> console.log(error));
    console.log("registrationForm",/*this.registrationForm.value*/form.value);
    
  }

}
