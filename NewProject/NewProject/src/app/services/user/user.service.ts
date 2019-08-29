import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserInfo() {
    return this.httpClient.get('http://localhost:52295/api/Account/UserInfo')
  }
  getUserData(email:string) {
    return this.httpClient.get('http://localhost:52295/api/Account/GetUserData?email='+email)
  }
  edit(user): Observable<any>{
    return this.httpClient.post(`http://localhost:52295/api/Account/Edit`,user);
  }
  remove(user): Observable<any>{
    return this.httpClient.post(`http://localhost:52295/api/Account/RemoveUser`, user);
  }
  getNotActiveUsers() : Observable<User[]>
  {
    return this.httpClient.get<User[]>(`http://localhost:52295/api/Account/GetNotActiveUsers`);
  }
 
}