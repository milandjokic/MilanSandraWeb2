import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class KontrolerService {

  constructor(private httpClient: HttpClient) { }

  validateUser(email : any, validate: boolean): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:52295/api/Account/ValidateUser?email=${email}&validate=${validate}`, [email, validate]);
  }
}
