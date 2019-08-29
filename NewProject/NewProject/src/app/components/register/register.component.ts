import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms/src/model';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userTypes = ['Student', 'Pensioner', 'RegularUser'];
  selectedUserType = 'RegularUser';
 // emailInUse: boolean = false;

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

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  checkPassword(group: FormGroup){
    let pass = group.controls.password.value;
    let confirmedPassword = group.controls.confirmPassword.value;

    return pass == confirmedPassword ? null : {notSame: true};
  }

  onSelect(event: any){
    this.selectedUserType = event.target.value;
  }

  onSubmit(){
    let data = this.registerForm.value;
    this.authService.register(data).subscribe();
    window.location.href = "/login";
    //this.login(this.registerForm.controls.email.value, this.registerForm.controls.password.value);
   
  }

  /*login(email: string, password: string)
  {
    console.log(this.registerForm.controls.email.value + this.registerForm.controls.password.value);
    this.authService.login(email, password).subscribe(
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
        window.location.href = "/profil"
      }
    );
  }*/

}
