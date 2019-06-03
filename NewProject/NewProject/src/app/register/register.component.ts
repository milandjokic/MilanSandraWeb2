import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

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
    password : ['', Validators.required],
    passwordRep : ['', Validators.required],
    dateOfBirth : ['', Validators.required]

  });

  izabraniTip = 'Djak';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSelect(event : any)
  {
    this.izabraniTip = event.target.value;
  }

  onSubmit()
  {
    console.log(this.registerForm.value.name + " " + this.registerForm.value.lastname + " " + this.izabraniTip)
  }

}
