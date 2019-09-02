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

  editPricelist(id: any, pricelistVersion: any, timeTicket: any, dayTicket: any, monthTicket: any, yearTicket: any): Observable<any>{
    return this.http.post<any>(`http://localhost:52295/api/PricelistItems/EditPricelist?id=${id}&pricelistVersion=${pricelistVersion}&timeTicket=${timeTicket}&dayTicket=${dayTicket}&monthTicket=${monthTicket}&yearTicket=${yearTicket}`, [id, pricelistVersion, timeTicket, dayTicket, monthTicket, yearTicket]);
     
  }

  addPriceList(to: any, timeTicket: any, dayTicket: any, monthTicket: any, yearTicket: any): Observable<any[]>{
    return this.http.post<any[]>(`http://localhost:52295/api/PricelistItems/AddPricelist?to=${to}&timeTicket=${timeTicket}&dayTicket=${dayTicket}&monthTicket=${monthTicket}&yearTicket=${yearTicket}`, [to, timeTicket, dayTicket, monthTicket, yearTicket]);
  }

}
