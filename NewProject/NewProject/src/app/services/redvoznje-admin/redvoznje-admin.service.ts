import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedvoznjeAdminService {

  constructor(private http: HttpClient) { }

  addDepartures(idLine: any, dayType : any, departures : any): Observable<any[]>{
    return this.http.post<any[]>(`http://localhost:52295/api/Timetables/AddDeparture?idLine=${idLine}&dayType=${dayType}&departures=${departures}`, [idLine, dayType, departures]);
  }

  deleteDeparture(departureId: any): Observable<any[]>{
    return this.http.delete<any[]>(`http://localhost:52295/api/Timetables/Delete?departureId=${departureId}`);
  }

  editDeparture(departureId: any, selectedDeparture: any): Observable<any>{
    return this.http.post<any>(`http://localhost:52295/api/Timetables/EditDeparture?departureId=${departureId}&selectedDeparture=${selectedDeparture}`, [departureId, selectedDeparture]);
  }
}
