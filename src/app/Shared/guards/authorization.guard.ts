import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthenticationService } from '../AuthenticationService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(public authService:AuthenticationService,private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       //let currentUser:User = this.authDataService.getCurrentUser();
     // if()
     if(next.data.role.indexOf(this.authService.currentUserRole)!=-1)
      {
         return  true;
      }
      else{

     //  this.router.navigate(['/home']);
        return false;
      }
   
  }
}
