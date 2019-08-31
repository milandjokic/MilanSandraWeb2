import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { User } from 'src/app/models/korisnik';

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
    image : [''],
    activated: ['', Validators.required]
  });

  userData: any = null;
  userProfileType: any;
  userProfileActivated: any;
  tempDate = new Date();
  selectValue: any;
  role = localStorage['role'];
  showFile : boolean;

  image: any = null;

  imageFile: File = null;

  constructor(public router: Router, private fb: FormBuilder, private userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
    
    
  }

  onSelect(event : any)
  {
    this.selectValue = event.target.value;
    if(event.target.value != '0')
    {
     this.showFile = true; 
    }
    else
    {
      this.showFile = false;
    }
  }

  getUser(){
    if(localStorage.getItem('name'))
    {
      this.userService.getUserData(localStorage.getItem('name')).subscribe( data =>{
        this.userData = data;
        this.initialize();
    });
    }
  }

  initialize(){

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
    
      this.profileForm.controls.activated.setValue(this.userData.Activated);
    
      if(this.selectValue != '0')
      {
        if(this.userProfileActivated == '2')
        {
          this.showFile = true;
        }
      }
      else
      {
        this.showFile = false;
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

    if(this.role == "AppUser" && this.userData.Image != null)
    {
      this.userService.downloadImage(this.userData.Email).subscribe(
        response => {
          this.image = 'data:image/jpeg;base64,' + response;
        }
      );

    }
  }

  onSubmit(){
    let formData = new FormData();

    if(this.imageFile != null){
      formData.append('image', this.imageFile, this.imageFile.name);
      formData.append('email', this.profileForm.controls.email.value);
    }

    this.userService.edit(this.profileForm.value).subscribe(
      response => {
        this.userService.uploadImage(formData).subscribe();
        window.location.href = "/profil";
      }
    );
  }

  delete(){
    this.userService.remove(this.profileForm.value).subscribe();
    this.authService.logout();
    window.location.href = '/login';
  }

  onImageChange(event: any){
    this.imageFile = <File>event.target.files[0];
  }
}
