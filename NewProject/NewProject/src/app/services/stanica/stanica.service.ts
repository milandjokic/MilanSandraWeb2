import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Station } from 'src/app/models/station';

@Injectable({
  providedIn: 'root'
})
export class StanicaService {

  constructor(private http: HttpClient) { }

  addStation(station): Observable<any>{
    return this.http.post("http://localhost:52295/api/Stations", station);
  }

  getStations() : Observable<any[]>
  {
    return this.http.get<any[]>(`http://localhost:52295/api/Stations`);
  }

  getStation(id: number): Observable<Station>{
    return this.http.get<Station>(`http://localhost:52295/api/Stations/${id}`);
  }
}
