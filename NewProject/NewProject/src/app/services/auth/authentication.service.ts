import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;
  base_url = "http://localhost:52295";

  constructor(private httpClient: HttpClient) { }

  register(user): Observable<any>{
    return this.httpClient.post(this.base_url+"/api/Account/Register", user);
  }

  login(email: any, password: any){
    let data = `username=${email}&password=${password}&grant_type=password`;
    let headers = new HttpHeaders();
    headers = headers.append("Content-type", "application/x-www-fore-urlencoded");

    if(!localStorage.jwt){
      this.isLoggedIn = true;
      return this.httpClient.post(this.base_url+"/oauth/token", data, {"headers": headers}) as Observable<any>;
    }
    else{
      // window.location.href = "/";
    }
  }

  logout(): void{
    this.isLoggedIn = false;
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    localStorage.removeItem('randid');
    window.location.href = "/login"
  }

  getTypes(){
    return this.httpClient.get(this.base_url+"/api/Types/GetTypes");
  }
}
