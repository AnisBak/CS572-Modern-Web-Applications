import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Credentials } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  baseUrl = "http://localhost:8080/api/";

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public register(user: Credentials): Observable<Credentials>{
    let tokenString: string = "Bearer "+ this.authenticationService.token;
    return this.http.post<Credentials>(this.baseUrl+"users", user.json(),{headers:{'authorization': tokenString }})
  }
 
  public login(user: Credentials): Observable<Credentials>{
    
    return this.http.put<Credentials>(this.baseUrl + "users", user.json());
  }
  // public getOne(id: string):Observable<Album> {
  //   const url: string = this.baseUrl + "/albums/" + id;
  //   return this.http.get<Album>(url);
  // }
  
  // public AddOne(album: FormGroup):Observable<any> {
  //   console.log("in the addOne Method");
    
  //   const url: string = this.baseUrl + "/albums";
  //   return this.http.post(url, album.value);
    
  // }

 

  // public delete(album: FormGroup): Observable<any>{
  //   console.log("in the delete method"+album.value.id);
  //   const url: string = this.baseUrl + "/albums/"+album.value.id;
  //   return this.http.delete(url, album.value);
  // }
}
