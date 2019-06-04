import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';

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
  

  constructor(private fb: FormBuilder) { }

  get f()
  {
    return this.loginForm.controls;
  }
  ngOnInit() {
    
  }
  onSubmit()
  {
    console.log(this.loginForm.value.email + " " + this.loginForm.value.password);
  }

}
