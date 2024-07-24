import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegistration } from '../interfaces/user-registration';
import { UserLogin } from '../interfaces/user-login';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl: string = 'http://localhost:8000/api/auth';
  private isAuth = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) {}


  isAuthenticatedStatus(): Observable<boolean> {
    return this.isAuth.asObservable();
  }
  public isAuthenticated() : boolean {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(localStorage.getItem('token'));
        this.isAuth.next(!isExpired)
        return !isExpired;
  }

  register(user: UserRegistration){
    return this.http.post(this.apiUrl+'/register',{
       name: user.name,
       email: user.email,
       password: user.password,
       password_confirmation: user.password_confirmation,
     });
   }

   login(user: UserLogin){
    return this.http.post(this.apiUrl+'/login',{
       email: user.email,
       password: user.password,
     });
   }

   logout(){
    const token = localStorage.getItem('token')
    const httpHeaders:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.apiUrl+'/logout',{},{headers:httpHeaders});
   }
}
