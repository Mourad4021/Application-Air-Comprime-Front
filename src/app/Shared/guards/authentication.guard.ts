import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../AuthenticationService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements  CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(public authService:AuthenticationService,private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       //let currentUser:User = this.authDataService.getCurrentUser();
      if(this.authService.currentUser!=null)
      {
       
         return  true;0
      }
      else{

        this.router.navigate(['/login']);
        return false;
      }
   
  }
}
