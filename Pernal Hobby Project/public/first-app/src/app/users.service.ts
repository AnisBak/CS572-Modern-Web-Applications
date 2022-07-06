import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Credentials } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private  baseUrl = environment.baseURL;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public register(user: Credentials): Observable<Credentials>{
    let tokenString: string = "Bearer "+ this.authenticationService.token;
    return this.http.post<Credentials>(this.baseUrl+"users", user.json(),{headers:{'authorization': tokenString }})
  }
 
  public login(user: Credentials): Observable<Credentials>{
    
    return this.http.put<Credentials>(this.baseUrl + "users", user.json());
  }
 
}
