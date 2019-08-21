import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KarteService {

  constructor(private http: HttpClient) { }

  addTicket(ticketPrice: any, selectedTicketType: any, userName: any, email: any): Observable<any>{
    return this.http.post("http://localhost:52295/api/Tickets/Add", [ticketPrice, selectedTicketType, userName, email]);
  }
}
