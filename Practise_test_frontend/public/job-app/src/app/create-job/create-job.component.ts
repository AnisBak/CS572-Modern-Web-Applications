import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobsDataService } from '../jobs-data.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJObComponent implements OnInit {
  
  addJobForm!: FormGroup;
  formBuilder!: FormBuilder;
  constructor(private jobService: JobsDataService) {
    this.formBuilder = new FormBuilder();
    this.addJobForm = this.formBuilder.group({
      title: "", salary: "", description: "", address:"", skills:"", experience:""
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
    console.log("data submitted successfulyy");
    
    this.jobService.addJob(form).subscribe((response) => console.log(response), (error)=> console.log(error));
   
    console.log("registrationForm",/*this.registrationForm.value*/form.value);
    
  }

}
