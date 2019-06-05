import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-karte',
  templateUrl: './karte.component.html',
  styleUrls: ['./karte.component.css']
})

export class KarteComponent implements OnInit {

  tipKarte = ['Mesecna', 'Vremenska', 'Godisnja'];
  karteForm = this.fb.group({

    typeOfCard : ['', Validators.required]

  });

  izabraniTip = ['Vremenska'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSelect(event : any)
  {
    this.izabraniTip = event.target.value;
  }

  onSubmit()
  {
    console.log(this.izabraniTip);
  }

}
