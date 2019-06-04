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
    image : ['']

  }, {validator: this.checkPassword});

  izabraniTip = 'Djak';

  djak: Djak = new Djak();

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
    console.log(this.registerForm.value.name + " " + this.registerForm.value.lastname + " " + this.izabraniTip);
    this.registerDjak();
    console.log(this.djak.Ime);
  }

  registerDjak()
  {
    this.djak.Ime = this.registerForm.controls.name.value;
    //this.service.registerDjak(this.djak).subscribe(djak => {this.djak});
  }

}
