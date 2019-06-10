import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedIn : any;

  constructor(private service: AuthenticationService) { }

  ngOnInit() {
    this.loggedIn = localStorage['role'];
  }

  logout()
  {
    this.service.logout();
    this.loggedIn = localStorage['role'];
  }
}
