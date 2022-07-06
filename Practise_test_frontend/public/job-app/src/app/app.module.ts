import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';
import { CreateJObComponent } from './create-job/create-job.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    JobsComponent,
    JobComponent,
    CreateJObComponent,
    SearchComponent,
    DeleteComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "jobs",
        component: JobsComponent
      }, {
        path: "job/:jobId",
        component: JobComponent
      },
      {
        path: "delete",
        component: DeleteComponent
      },
      {
        path: "edit",
        component: EditComponent
      },
     {
        path: "create",
        component: CreateJObComponent
      },
      {
        path: "search",
        component: SearchComponent
      }
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
