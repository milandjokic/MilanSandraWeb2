import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';

import { AuthenticationService } from '../services/auth.service';

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

  constructor(private fb: FormBuilder, private service: AuthenticationService) { }

  get f()
  {
    return this.loginForm.controls;
  }
  ngOnInit() {
    
  }
  onSubmit()
  {
    console.log(this.loginForm.value.email + " " + this.loginForm.value.password);
    this.onSignIn(this.loginForm.value.email,  this.loginForm.value.password);
  }


  onSignIn(email : string, password : string){
    this.service.signIn(email,password).subscribe(
      res => {
        console.log(res.access_token);

        let jwt = res.access_token;
        let jwtData = jwt.split('.')[1]
        let decodedJwtJasonData = window.atob(jwtData)
        let decodetJwtData = JSON.parse(decodedJwtJasonData)

        let role = decodetJwtData.role

        console.log('jwtData: ' + jwtData)
        console.log('decodedJwtJsonData: ' + decodedJwtJasonData)
        console.log(decodetJwtData)
        console.log('Role: ' + role)
        let a = decodetJwtData.unique_name
        localStorage.setItem('jwt', jwt)
        localStorage.setItem('role', role)
        localStorage.setItem('name',a);
        window.location.href = "/cenovnik"
      }
    );
  }

}
