import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CenovnikService } from 'src/app/services/cenovnik/cenovnik.service';
import { UserService } from 'src/app/services/user/user.service';
import { KarteService } from 'src/app/services/karte/karte.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

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
  email: any;
  temp: any;
  isLoggedIn: boolean;
  priceEur : number;

  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean;

  ticketForm = this.fb.group({
    typeOfCard : ['TimeTicket', Validators.required]
  });

  choosenTicketType: any;

  constructor(private fb: FormBuilder, private cenovnikService: CenovnikService, private userService: UserService, private karteService: KarteService) { }

  ngOnInit() {
    this.choosenTicketType = 'TimeTicket';
    this.loggedIn = localStorage['role'];
    this.getUser();
    this.initConfig();
    this.temp = localStorage['name'];
    if(this.temp){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }

  onSelect(event : any){
    this.choosenTicketType = event.target.value;
    this.getUser();
  }

  onSubmit(){
    this.karteService.addTicket(this.price, this.choosenTicketType, localStorage.getItem('name'), this.email).subscribe(data => this.addTicket=data);
  }

  getUser(){
    if(localStorage.getItem('name'))
      {
        this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
        this.userData = data;
        this.userProfileActivated = this.userData.Activated;
        this.userProfileType = this.userData.UserType;
        this.email = this.userData.Email;
        if(!this.userProfileActivated)
        {
          this.userProfileType = 0;
        }
        this.cenovnikService.getTicketPrice(this.choosenTicketType, this.userProfileType).subscribe( data =>
          {
            this.price = data;
            this.priceEur = this.price * 0.0085;

          });
      });
      }
      else
      {
        this.cenovnikService.getTicketPrice(this.choosenTicketType, '0').subscribe( data => 
          {
            this.price = data;
            this.priceEur = this.price * 0.0085;
          });
            
      }
  }

  buyTicket(){
    this.karteService.addTicket(this.price, this.choosenTicketType, localStorage.getItem('name'), this.email).subscribe( data => this.addTicket = data);
    window.alert("You've buyed a ticked");
  }

  
   private initConfig(): void {

    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'ATniFSIBK8rHNVLG_PetS-skYOy0lfhJw1m7IlrlHhqLzAC7_HaD1fNQPX_y8nDiTvtfyn7uyQEyofp6',
      

      createOrderOnClient: (data) => <ICreateOrderRequest> {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                  currency_code: 'EUR',
                  value: this.priceEur.toPrecision(2),
                  breakdown: {
                      item_total: {
                          currency_code: 'EUR',
                          value: this.priceEur.toPrecision(2)
                      }
                  }
              },
              items: [{
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                      currency_code: 'EUR',
                      value: this.priceEur.toPrecision(2),
                  },
              }]
          }]
      },
      advanced: {
          commit: 'true'
          
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },

      onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
      },
      onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          
          if(!this.loggedIn){
            this.userProfileType = 0;
            
          }
          this.karteService.buyTicket(this.isLoggedIn, this.email, data.id, data.payer.email_address, data.payer.payer_id, this.price, this.choosenTicketType, this.userProfileType).subscribe();
          
      },
      onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
         

      },
      onError: err => {
        window.alert("Something went wrong!");
          console.log('OnError', err);
          
      },
      onClick: (data, actions) => {
          console.log('onClick', data, actions);
          
      },
  };
}

}
