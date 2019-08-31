import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {    
    if (localStorage.role === 'Controller' || localStorage.role === 'Admin' || localStorage.role ==='AppUser') {
      return true;
    }
    // not logged in so redirect to login page
    else {
      console.error("Nemate pristup, niste registrovani registrovani");
        this.router.navigate(['register']);
        return false;
      }
     
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
