import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';
import { FormGroup } from '@angular/forms/src/model';

import { RegisterServiceService } from '../services/register-service.service';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  tipKorisnika = ['Student', 'Pensioner', 'RegularUser'];
  registerForm = this.fb.group({
    name : ['', Validators.required],
    lastname : ['', Validators.required],
    email : ['', Validators.required],
    password : ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword : ['', [Validators.required, Validators.minLength(8)]],
    dateOfBirth : ['', Validators.required],
    address : ['', Validators.required],
    image : [''],
    userType : ['', Validators.required]

  }, {validator: this.checkPassword});

  izabraniTip = 'RegularUser';

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  checkPassword(group:FormGroup){
      let pass = group.controls.password.value;
      let confirmedPassword = group.controls.confirmPassword.value;

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
    let controls = this.registerForm.controls;
    let dataOld = [
      controls.email.value,
      controls.name.value,
      controls.lastname.value,
      controls.address.value,
      controls.dateOfBirth.value,
      controls.userType.value,
      controls.password.value,
    ];

    let data = this.registerForm.value;
    console.log(data);


    this.authService.register(data).subscribe();
  }
}
