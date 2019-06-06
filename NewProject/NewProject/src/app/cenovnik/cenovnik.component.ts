import { Component, OnInit } from '@angular/core';
import { CenovnikService } from 'src/app/services/cenovnik.service';

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

  cena : number;

  constructor(private service : CenovnikService) { }

  ngOnInit() {
    this.izabranaKarta = this.tipKarte[0];
    this.izabraniKorisnik = this.tipKorisnika[0];
    this.service.getCenaKarte(this.izabranaKarta+'Karta', this.izabraniKorisnik).subscribe(cena => this.cena = cena);
  }
  
  onSelectKarta(event : any){
    this.izabranaKarta = event.target.value;
    this.service.getCenaKarte(this.izabranaKarta+'Karta', this.izabraniKorisnik).subscribe(cena => this.cena = cena);
  }

  onSelectKorisnik(event : any)
  {
    this.izabraniKorisnik = event.target.value;
    this.service.getCenaKarte(this.izabranaKarta+'Karta', this.izabraniKorisnik).subscribe(cena => this.cena = cena);

  }
}
