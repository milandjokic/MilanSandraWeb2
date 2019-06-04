import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { Djak, Penzioner, RegularniKorisnik } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private getDjaksURL: string = 'http://localhost:52295/api/djaks';
  private getPenzionersURL: string = 'http://localhost:52295/api/penzioners';
  private getRegularniKorisniksURL: string = 'http://localhost:52295/api/regularnikorisniks';
  

  constructor(private http: HttpClient) { }

  getDjaks(): Observable<Djak[]>
  {
    return this.http.get<Djak[]>(this.getDjaksURL);
  }

  getPenzioners() : Observable<Penzioner[]>
  {
    return this.http.get<Penzioner[]>(this.getPenzionersURL);
  }

  getRegularniKorisniks(): Observable<RegularniKorisnik[]>
  {
    return this.http.get<RegularniKorisnik[]>(this.getRegularniKorisniksURL);
  }
}
