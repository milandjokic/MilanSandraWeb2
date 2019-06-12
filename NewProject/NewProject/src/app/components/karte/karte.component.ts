import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CenovnikService } from 'src/app/services/cenovnik/cenovnik.service';
import { UserService } from 'src/app/services/user/user.service';
import { KarteService } from 'src/app/services/karte/karte.service';

@Component({
  selector: 'app-karte',
  templateUrl: './karte.component.html',
  styleUrls: ['./karte.component.css']
})

export class KarteComponent implements OnInit {

  loggedIn : undefined;
  price: number;
  userData: any;
  userProfileActivated: any;
  userProfileType: any;
  addTicket: any;

  ticketForm = this.fb.group({
    typeOfCard : ['TimeTicket', Validators.required]
  });

  choosenTicketType: any;

  constructor(private fb: FormBuilder, private cenovnikService: CenovnikService, private userService: UserService, private karteService: KarteService) { }

  ngOnInit() {
    this.choosenTicketType = 'TimeTicket';
    this.loggedIn = localStorage['role'];
    this.getUser();
  }

  onSelect(event : any){
    this.choosenTicketType = event.target.value;
    this.getUser();
  }

  onSubmit(){
    this.karteService.addTicket(this.price, this.choosenTicketType, localStorage.getItem('name')).subscribe(data => this.addTicket=data);
  }

  getUser(){
    if(localStorage.getItem('name'))
      {
        this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
        this.userData = data;
        this.userProfileActivated = this.userData.Activated;
        this.userProfileType = this.userData.UserType;
        if(!this.userProfileActivated)
        {
          this.userProfileType = 'RegularUser';
        }
        this.cenovnikService.getTicketPrice(this.choosenTicketType, this.userProfileType).subscribe( data => this.price = data);
      });
      }
      else
      {
        this.cenovnikService.getTicketPrice(this.choosenTicketType, 'RegularUser').subscribe( data => this.price = data);
      }
  }

}
