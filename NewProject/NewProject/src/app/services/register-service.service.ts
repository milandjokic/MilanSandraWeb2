import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Djak, Penzioner, RegularniKorisnik } from '../classes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  private registerDjaksURL: string = 'http://localhost:52295/api/djaks';
  private registerPenzionersURL: string = 'http://localhost:52295/api/penzioners';
  private registerRegularniKorisniksURL: string = 'http://localhost:52295/api/regularnikorisniks';

  constructor(private http: HttpClient) { }

  registerDjak(djak: Djak): Observable<Djak>
  {
    return this.http.post<Djak>(this.registerDjaksURL, djak, httpOptions);
  }
}
