import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CenovnikService {

  priceListItemUrl = 'http://localhost:52295/api/PricelistItems/GetPrice';

  constructor(private http: HttpClient) { }

  getTicketPrice(ticketType : string, userType : string) : Observable<number>
  {
    return this.http.get<number>(`${this.priceListItemUrl}?ticketType=${ticketType}&userType=${userType}`);
  }
}
