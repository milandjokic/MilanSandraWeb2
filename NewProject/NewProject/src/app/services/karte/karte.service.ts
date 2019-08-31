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

  getTicket(id : any): Observable<any>{
    return this.http.get<any>(`http://localhost:52295/api/Tickets/GetTicket?id=${id}`, id);
  }

  buyTicket(isLoggedIn: boolean, email: any, id: any, payer_email: any, payer_id: any, price: any, choosenTicketType: any, userProfileType: any): Observable<any>{
    return this.http.post<any>(`http://localhost:52295/api/Tickets/BuyTicket?isLoggedIn=${isLoggedIn}&email=${email}&id=${id}&payer_email=${payer_email}&payer_id=${payer_id}&price=${price}&choosenTicketType=${choosenTicketType}&userProfileType=${userProfileType}`, [isLoggedIn,email,id,payer_email, payer_id, price, choosenTicketType, userProfileType]);
      
  }


}
