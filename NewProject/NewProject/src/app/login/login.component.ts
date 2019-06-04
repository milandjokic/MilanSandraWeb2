import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';

import { LoginServiceService } from '../services/login-service.service';

import { Djak, Penzioner, RegularniKorisnik } from '../classes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', Validators.required],
  });
  
  djaks: Djak[] = [];
  penzioners: Penzioner[] = [];
  regularniKorisniks: RegularniKorisnik[] = [];

  constructor(private fb: FormBuilder, private service: LoginServiceService) { }

  get f()
  {
    return this.loginForm.controls;
  }
  ngOnInit() {
    this.getDjaks();
    this.getPenzioners();
    this.getRegularniKorisniks();
  }
  onSubmit()
  {
    console.log(this.loginForm.value.email + " " + this.loginForm.value.password);
    

    console.log(this.djaks[0]);
    console.log(this.penzioners[0]);
    console.log(this.regularniKorisniks[0]);
  }

  getDjaks(): void{
    this.service.getDjaks().subscribe(djaks => this.djaks = djaks);
  }

  getPenzioners(): void{
    this.service.getPenzioners().subscribe(penzioners => this.penzioners = penzioners);
  }

  getRegularniKorisniks(): void{
    this.service.getRegularniKorisniks().subscribe(regularniKorisniks => this.regularniKorisniks = regularniKorisniks);
  }

}
