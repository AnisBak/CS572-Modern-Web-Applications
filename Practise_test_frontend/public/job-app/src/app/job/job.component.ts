import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsDataService } from '../jobs-data.service';
import { Job } from '../jobs/jobs.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  job!: Job;
  
  constructor(private route: ActivatedRoute, private jobService: JobsDataService) {
    this.job = new Job("", "", 0);

   }

  ngOnInit(): void {
    const jobId = this.route.snapshot.params["jobId"];
    this.jobService.getJob(jobId).subscribe(job => {
      this.job = job;
    })
  }
}
