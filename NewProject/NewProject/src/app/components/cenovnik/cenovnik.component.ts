import { Component, OnInit } from '@angular/core';
import { CenovnikService } from 'src/app/services/cenovnik/cenovnik.service';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {

  ticketTypes = ['TimeTicket', 'DayTicket', 'MonthTicket', 'YearTicket'];
  userTypes = ['RegularUser', 'Student', 'Pensioner'];
  choosenTicketType: any;
  choosenUserType: any;

  price : number;

  constructor(private cenovnikServis: CenovnikService) { }

  ngOnInit() {
    this.choosenTicketType = this.ticketTypes[0];
    this.choosenUserType = this.userTypes[0];
    this.cenovnikServis.getTicketPrice(this.choosenTicketType, this.choosenUserType).subscribe(price => this.price = price);
  }
  
  onSelectTicket(event : any){
    this.choosenTicketType = event.target.value;
    this.cenovnikServis.getTicketPrice(this.choosenTicketType, this.choosenUserType).subscribe(price => this.price = price);
  }

  onSelectUser(event : any)
  {
    this.choosenUserType = event.target.value;
    this.cenovnikServis.getTicketPrice(this.choosenTicketType, this.choosenUserType).subscribe(price => this.price = price);

  }
}
