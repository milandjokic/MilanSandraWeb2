import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CenovnikAdminService {

  constructor(private http: HttpClient) { }

  getPrices(): Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:52295/api/PricelistItems/GetActivePricelists`);
  }

  editPricelist(id: any, timeTicket: any, dayTicket: any, monthTicket: any, yearTicket: any): Observable<any[]>{
    return this.http.post<any[]>(`http://localhost:52295/api/PricelistItems/EditPricelist?id=${id}&timeTicket=${timeTicket}&dayTicket=${dayTicket}&monthTicket=${monthTicket}&yearTicket=${yearTicket}`, [id, timeTicket, dayTicket, monthTicket, yearTicket]);
     
  }

}
