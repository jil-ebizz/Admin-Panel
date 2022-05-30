import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public user_login = 'https://reqres.in/api/login';
  
  httpOptions = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }
 

  login(data: any) {
    return this.http.post(this.user_login,data)
    .pipe(map(data => {
       // store user details and jwt token in local storage to keep user logged in between page refreshes
       localStorage.setItem('userDetails', JSON.stringify(data));
    }))
     
  }

  logout(){
    localStorage.removeItem('logindata');
    localStorage.clear();
    this.router.navigate(['']);
  }

  get userDetails(){
    return localStorage.getItem('userDetails') != null ? JSON.parse(localStorage.getItem('userDetails') as string) || '' : '';
  }
}
