import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn : any;

  constructor(private authServise: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn = localStorage['role'];
  }

  logout(){
    this.authServise.logout();
    this.isLoggedIn = localStorage['role'];
    
  }

}
