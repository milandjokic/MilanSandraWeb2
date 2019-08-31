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
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
    if (localStorage.role != 'Controller' && localStorage.role != 'Admin') {
      return true;
    }
    // not logged in so redirect to login page
    else {
      console.error("Nemate pristup, niste Korisnik");
        this.router.navigate(['profil']);
        return false;
      }
     
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
