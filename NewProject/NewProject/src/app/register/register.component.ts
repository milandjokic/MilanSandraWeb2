import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { FormGroup } from '@angular/forms/src/model';

import { RegisterServiceService } from '../services/register-service.service';

import { Djak, Penzioner, RegularniKorisnik } from '../classes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  tipKorisnika = ['Djak', 'Penzioner', 'Regularni korisnik'];
  registerForm = this.fb.group({
    name : ['', Validators.required],
    lastname : ['', Validators.required],
    email : ['', Validators.required],
    password : ['', [Validators.required, Validators.minLength(8)]],
    passwordRep : ['', [Validators.required, Validators.minLength(8)]],
    dateOfBirth : ['', Validators.required],
    address : ['', Validators.required],
    image : [''],
    typeOfUser : ['', Validators.required]

  }, {validator: this.checkPassword});

  izabraniTip = 'Regularni korisnik';

  djak: Djak = new Djak();
  djaks: Djak[] = [];

  penzioner: Penzioner = new Penzioner();
  penzioners: Penzioner[] = [];

  regularniKorisnik: RegularniKorisnik = new RegularniKorisnik();
  regularniKorisniks: RegularniKorisnik[] = [];

  constructor(private fb: FormBuilder, private service: RegisterServiceService) { }

  checkPassword(group:FormGroup){
      let pass = group.controls.password.value;
      let confirmedPassword = group.controls.passwordRep.value;

      return pass == confirmedPassword ? null : {notSame: true}

  }
  ngOnInit() {
    
  }

  onSelect(event : any)
  {
    this.izabraniTip = event.target.value;
  }

  onSubmit()
  {
    if(this.registerForm.controls.typeOfUser.value === 'Djak')
    {
      this.addDjak();
    }
    else if(this.registerForm.controls.typeOfUser.value === 'Penzioner')
    {
      this.addPenzioner();
    }
    else
    {
      this.addRegularniKorisnik();
    }
  }

  addDjak()
  {
    this.djak.Ime = this.registerForm.controls.name.value;
    this.djak.Prezime = this.registerForm.controls.lastname.value;
    this.djak.Adresa = this.registerForm.controls.address.value;
    this.djak.Lozinka = this.registerForm.controls.password.value;
    this.djak.Email = this.registerForm.controls.email.value;
    this.djak.DatumRodjenja = this.registerForm.controls.dateOfBirth.value;
    this.djak.Slika = this.registerForm.controls.image.value;

    //console.log(`${this.djak.Ime} ${this.djak.Prezime} ${this.djak.Adresa} ${this.djak.DatumRodjenja}`);
    this.service.registerDjak(this.djak).subscribe(djak => {this.djaks.push(djak);
    });
  }

  addPenzioner()
  {
    this.penzioner.Ime = this.registerForm.controls.name.value;
    this.penzioner.Prezime = this.registerForm.controls.lastname.value;
    this.penzioner.Adresa = this.registerForm.controls.address.value;
    this.penzioner.Lozinka = this.registerForm.controls.password.value;
    this.penzioner.Email = this.registerForm.controls.email.value;
    this.penzioner.DatumRodjenja = this.registerForm.controls.dateOfBirth.value;
    this.penzioner.Slika = this.registerForm.controls.image.value;

    this.service.registerPenzioner(this.penzioner).subscribe(penzioner => {this.penzioners.push(penzioner);
    });

  }

  addRegularniKorisnik()
  {
    this.regularniKorisnik.Ime = this.registerForm.controls.name.value;
    this.regularniKorisnik.Prezime = this.registerForm.controls.lastname.value;
    this.regularniKorisnik.Adresa = this.registerForm.controls.address.value;
    this.regularniKorisnik.Lozinka = this.registerForm.controls.password.value;
    this.regularniKorisnik.Email = this.registerForm.controls.email.value;
    this.regularniKorisnik.DatumRodjenja = this.registerForm.controls.dateOfBirth.value;
    
    this.service.registerRegularniKorisnik(this.regularniKorisnik).subscribe(regularniKorisnik => {this.regularniKorisniks.push(regularniKorisnik);
    });

  }
}
