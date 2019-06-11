import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CenovnikService {

  cenovnikUrl = 'http://localhost:52295/api/PricelistItems/GetPrice';

  constructor(private http: HttpClient) { }

  getCenaKarte(vrstaKarte : any, tipKorisnika : any) : Observable<number>
  {
    return this.http.get<number>(this.cenovnikUrl+'?'+'ticketType='+vrstaKarte+'&userType='+tipKorisnika);
  }
}
