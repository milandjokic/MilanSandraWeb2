import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Line } from 'src/app/models/linija';
import {Departure} from 'src/app/models/polazak'

@Injectable({
  providedIn: 'root'
})
export class RasporedService {

  constructor(private http: HttpClient) { }

  //getLines(lineType:any): Observable<Line[]> {return this.http.get<Line[]>('http://localhost:52295/api/Timetables/Lines?lineType=${lineType}');
  getLines(lineType:any):Observable<Line[]> {return this.http.get<Line[]>(`http://localhost:52295/api/Timetables/Lines?lineType=${lineType}`);
}

getSchedule(dayType: any, lineType:any , lineName : any): Observable<Departure[]> 
{
  return this.http.get<Departure[]>(`http://localhost:52295/api/Timetables?dayType=${dayType}&lineType=${lineType}&lineName=${lineName}`);
}
} 