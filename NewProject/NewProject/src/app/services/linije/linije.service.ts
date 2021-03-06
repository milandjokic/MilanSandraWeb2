import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { Line } from 'src/app/models/linija';


@Injectable({
  providedIn: 'root'
})
export class LinijeService {

  constructor(private http: HttpClient) { 
    
  }

  addLine(stations: any, lineName: any, lineType: any): Observable<any>{
    return this.http.post(`http://localhost:52295/api/Lines?stations=${stations}&lineName=${lineName}&lineType=${lineType}`, [stations, lineName, lineType]);
  }

  getLines(): Observable<any[]>
  {
    return this.http.get<any[]>(`http://localhost:52295/api/Lines`);
  }

  getLine(id: number): Observable<Line>{
    return this.http.get<Line>(`http://localhost:52295/api/Lines/${id}`);
  }

  deleteLine(id: any): Observable<any>{
    return this.http.delete<any>(`http://localhost:52295/api/Lines/Delete?id=${id}`);
  }

  editLine(lineName: any, lineVersion : number, lineType: any, id:any, stationsIds : any): Observable<any>{
    return this.http.post<any>(`http://localhost:52295/api/Lines/Edit?lineName=${lineName}&lineVersion=${lineVersion}&lineType=${lineType}&id=${id}&stationsIds=${stationsIds}`, [lineName, lineVersion, lineType, id, stationsIds]);
  }

  getLineStations(id : any): Observable<any[]>
  {
    return this.http.get<any[]>(`http://localhost:52295/api/Lines/GetLinesStations?id=${id}`);
  }
}
