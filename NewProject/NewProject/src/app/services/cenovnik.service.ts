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

  cenovnikUrl = 'http://localhost:52295/api/Cenovniks';

  constructor(private http: HttpClient) { }

  getCenaKarte(vrstaKarte : string, tipKorisnika : string) : Observable<number>
  {
    return this.http.get<number>(this.cenovnikUrl+'?'+'vrstaKarte='+vrstaKarte+'&tipKorisnika='+tipKorisnika);
  }
}
