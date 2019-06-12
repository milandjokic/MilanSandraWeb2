import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

    profileForm = this.fb.group({
    name : ['', Validators.required],
    lastname : ['', Validators.required],
    email : [''],
    dateOfBirth : ['', Validators.required],
    address : ['', Validators.required],
    image : ['']
  });

  userData: any;
  userProfileType: any;
  userProfileActivated: any;
  tempDate = new Date();
  selectValue: any;

  constructor(public router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  onSelect(event : any)
  {
    this.selectValue = event.target.value;
  }

  getUser(){
    if(localStorage.getItem('name'))
    {
      this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
        this.userData = data;

        this.userProfileActivated = this.userData.Activated;
        if(this.userData.Name)
        {
          this.profileForm.controls.name.setValue(this.userData.Name);
        }
        if(this.userData.Lastname)
        {
          this.profileForm.controls.lastname.setValue(this.userData.Lastname);
        }
        if(this.userData.Address)
        {
          this.profileForm.controls.address.setValue(this.userData.Address);
        }
        if(this.userData.DateOfBirth)
        {
          let dateOfBirth = this.userData.DateOfBirth.split('T', 2);
          this.profileForm.controls.dateOfBirth.setValue(`${dateOfBirth[0]}`);
        }
        if(this.userData.Email)
        {
          this.profileForm.controls.email.setValue(this.userData.Email);
        }
        /*if(this.userData.Password)
        {  
          this.profileForm.controls.password.setValue(this.userData.Password);
        }
        (this.userData.ConfirmPass)
        {
          this.profileForm.controls.confirmPassword.setValue(this.userData.ConfirmPass);
        }
        if(this.userData.UserType)
        {
          if(this.userData.UserType == 0)
          {
            this.selectValue = 'RegularUser';
            this.profileForm.controls.userType.setValue(this.selectValue);
          }
          else if(this.userData.UserType == 1)
          {
            this.selectValue = 'Student';
            this.profileForm.controls.userType.setValue(this.selectValue);
          }
          else if(this.userData.UserType == 2)
          {
            this.selectValue = 'Pensioner';
            this.profileForm.controls.userType.setValue(this.selectValue);
          }
        }*/
        if(this.userData.Image)
        {
          this.profileForm.controls.image.setValue(this.userData.Image);
        }
      
    });
    }
  }

  onSubmit(){
    this.userService.edit(this.profileForm.value).subscribe();
  }
}
