import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobsDataService } from '../jobs-data.service';
import { Job } from '../jobs/jobs.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  jobArray: Job[]=[];
  job: Job= new Job("","",0);
  skillForm!: FormGroup;
  formBuilder!: FormBuilder;
  skill: string = ""
  constructor(private jobService: JobsDataService) {
    this.formBuilder = new FormBuilder();
    this.skillForm = this.formBuilder.group({
      skill: ""
    });
    this.job = new Job("", "", 0);
  }
  ngOnInit(): void {
  }

  search(): void {
    this.skill = this.skillForm.get('skill')?.value;
    console.log("looking for a job by skill");
    
    this.jobService.getJobBySkill(this.skill).subscribe((response) => this.jobArray = response, (error)=> console.log(error));
    this.job = this.jobArray[0];
    
  }

}
