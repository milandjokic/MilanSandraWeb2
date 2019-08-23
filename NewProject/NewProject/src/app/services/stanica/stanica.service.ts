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

  deleteStation(id: any): Observable<any>{
    return this.http.delete<any>(`http://localhost:52295/api/Stations/Delete?id=${id}`);
  }

  editStation(station: any, id:any): Observable<any>{
    return this.http.post<any>(`http://localhost:52295/api/Stations/Edit?station=${station}&id=${id}`, station, id);
  }

  findLines(id: any): Observable<any>{
    return this.http.get<any>(`http://localhost:52295/api/Stations/FindLine?id=${id}`);
  }
}
