import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cenovnik',
  templateUrl: './cenovnik.component.html',
  styleUrls: ['./cenovnik.component.css']
})
export class CenovnikComponent implements OnInit {

  tipKarte = ['Vremenska', 'Mesecna', 'Dnevna', 'Godisnja'];
  tipKorisnika = ['Penzioner', 'Djak', 'Regularan'];
  izabranaKarta: any;
  izabraniKorisnik: any;

  constructor() { }

  ngOnInit() {
    this.izabranaKarta = this.tipKarte[0];
    this.izabraniKorisnik = this.tipKorisnika[0];
  }
  
  onSelectKarta(event : any){
    this.izabranaKarta = event.target.value;
  }

  onSelectKorisnik(event : any)
  {
    this.izabraniKorisnik = event.target.value;
  }
}
