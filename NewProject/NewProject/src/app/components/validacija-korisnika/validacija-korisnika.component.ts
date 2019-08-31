import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/korisnik';
import { KontrolerService } from 'src/app/services/kontroler/kontroler.service';

@Component({
  selector: 'app-validacija-korisnika',
  templateUrl: './validacija-korisnika.component.html',
  styleUrls: ['./validacija-korisnika.component.css']
})
export class ValidacijaKorisnikaComponent implements OnInit {

  profileForm = this.fb.group({
    name : ['', Validators.required],
    lastname : ['', Validators.required],
    email : [''],
    dateOfBirth : ['', Validators.required],
    address : ['', Validators.required],
    userType : ['', Validators.required]
  });

  users : User[] = [];
  selectedUserEmail: any;
  i: number;
  image: any = null;

  constructor(private fb: FormBuilder, private userService : UserService, private controllerService : KontrolerService) { }

  ngOnInit() {
    this.getNoActiveUsers();
  }

  getNoActiveUsers()
  {
    this.userService.getNotActiveUsers().subscribe(
      data=>{
        this.users = data;
        if(this.users.length > 0)
        {
          this.selectedUserEmail = this.users[0].Email;
          this.populateForm();
        }
        
      });
  }

  onSelectUser(event : any)
  {
    this.selectedUserEmail = event.target.value;
    this.populateForm();

    this.userService.downloadImage(this.selectedUserEmail).subscribe(
      response => {
        this.image = 'data:image/jpeg;base64,' + response;
      });
  }

  populateForm()
  {
    for(this.i = 0; this.i < this.users.length; this.i++)
    {
      if(this.users[this.i].Email == this.selectedUserEmail)
      {
        this.profileForm.controls.name.setValue(this.users[this.i].Name);
        this.profileForm.controls.lastname.setValue(this.users[this.i].Lastname);
        this.profileForm.controls.address.setValue(this.users[this.i].Address);
        this.profileForm.controls.dateOfBirth.setValue(this.users[this.i].DateOfBirth.split('T',1));
        this.profileForm.controls.email.setValue(this.users[this.i].Email);
        this.profileForm.controls.userType.setValue(this.users[this.i].UserType);

      }
    }

    this.userService.downloadImage(this.selectedUserEmail).subscribe(
      response => {
        this.image = 'data:image/jpeg;base64,' + response;
      });
  }

  validate()
  {
    this.controllerService.validateUser(this.profileForm.controls.email.value, true).subscribe(
      data => 
      {
        this.profileForm.reset();
        this.getNoActiveUsers();
        this.image = null;
      }
    );
  }

  dismiss()
  {
    this.controllerService.validateUser(this.profileForm.controls.email.value, false).subscribe(
      data => 
      {
        this.profileForm.reset();
        this.getNoActiveUsers();
        this.image = null;
      }
    );
  }
}
