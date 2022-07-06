import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient}  from '@angular/common/http'
import { Job } from './jobs/jobs.component';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class JobsDataService {

  baseUrl: string = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }


  public getJobs(): Observable<Job[]>{
    const url: string = this.baseUrl + "/jobs";
    console.log("wwwwwwwwwww");
    
    return this.http.get<Job[]>(url);
     
  }
  
  public getJob(id: string): Observable<Job>{
    console.log("zzzzzzzzzzzzzz");
    const url: string = this.baseUrl + "/jobs/" + id;
    return this.http.get<Job>(url);
  }

  public getJobBySkill(skill: string): Observable<Job[]>{
    console.log(skill);
    const url: string = this.baseUrl + "/jobs/search/" + skill;
    return this.http.get<Job[]>(url);
  }


  public addJob(job: FormGroup):Observable<any> {
    console.log("in the addJob Method");
    
    const url: string = this.baseUrl + "/jobs";
    return this.http.post(url, job.value);
    
  }

  public delete(job: FormGroup): Observable<any>{
    console.log("in the delete method"+job.value.id);
    const url: string = this.baseUrl + "/jobs/"+job.value.id;
    return this.http.delete(url, job.value);
  }

  public update(job: FormGroup): Observable<any>{
    console.log("in the update method"+job.value.id);
    const url: string = this.baseUrl + "/albums/"+job.value.id;
    return this.http.patch(url, job.value);
  }
}
