import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  tipKorisnika = ['Djak', 'Penzioner', 'Regularni korisnik'];

  izabraniTip : any;

  constructor() { }

  ngOnInit() {
  }

  onSelect(event : any)
  {
    this.izabraniTip = event.target.value;
  }

}
