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
export class NotRegisteredGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
    if (localStorage.role != 'Controller' && localStorage.role != 'Admin' && localStorage.role !='AppUser') {
      return true;
    }
    // not logged in so redirect to login page
    else {
      console.error("Nemate pristup, vec ste registrovani");
        this.router.navigate(['profil']);
        return false;
      }
     
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
  
}
