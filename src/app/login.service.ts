import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginViewModel } from './login-view-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private httpClient: HttpClient;
  constructor(private httpBackend: HttpBackend, private httpClient: HttpClient, private jwtHelperService:JwtHelperService) {

   }

  currentUserName:string = "";

  public Login(loginViewModel:LoginViewModel):Observable<any>
  {
    this.httpClient=new HttpClient(this.httpBackend);
    return this.httpClient.get<any>("http://localhost:9090/validUser")
    .pipe(
      map(user =>{
      if(user)
      {
        this.currentUserName= user.userName;
        sessionStorage.currentUser=JSON.stringify(user);
      }
      return user;
    }));
    // sessionStorage.currentUser = 'saravanan';
    // return of({
    //   userName: 'saravanan'
    // });
  }

  public Logout()
  {
    sessionStorage.removeItem("currentUser");
    this.currentUserName="";
  }
  public isAuthenticated():boolean
{
  var token=sessionStorage.getItem("currentUser")?JSON.parse(sessionStorage.getItem("currentUser")as string).token:null;
  if(this.jwtHelperService.isTokenExpired())
  {
    return false;
  }
  else
  {
    return true;
  }
}
}
