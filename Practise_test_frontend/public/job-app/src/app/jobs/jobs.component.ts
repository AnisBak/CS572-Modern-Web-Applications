import { Component, OnInit } from '@angular/core';
import { JobsDataService } from '../jobs-data.service';


export class Job {
  #_id!: string;
  #title!: string;
  #description!: string;
  #salary!: number;
  #experience!: number;
  #skills!: string;
  #postDate!: Date;
  #address!: string;

  get _id() { return this.#_id; }
  get title() { return this.#title; }
  set title(title: string) { this.#title = title; }
  get description() { return this.#description; }
  get salary() { return this.#salary; }
  get experience() { return this.#experience; }
  set experience(experience: number) { this.#experience = experience; }

  get skills() { return this.#skills; }
  get postDate() { return this.#postDate; }
  get address() { return this.#address; }

  
  constructor(id: string, title: string, salary: number) {
    this.#_id = id;
    this.#title = title;
    this.#salary = salary;
  }

}
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: Job[] = []
  constructor(private jobService:JobsDataService) { }

  ngOnInit(): void {
    console.log("sssssssssss");
    
    this.jobService.getJobs().subscribe(jobs => this.jobs = jobs);
  }
}
