import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ControllerGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
    if (localStorage.role === 'Controller') {
      return true;
    }
    // not logged in so redirect to login page
    else {
      console.error("Nemate pristup, niste Kontroler");
      if(localStorage.role != 'Admin' && localStorage.role != 'AppUser')
      {
        this.router.navigate(['register']);
      }
      else
      {

        this.router.navigate(['profil']);
      }
      return false;
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
