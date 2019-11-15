import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../../AuthenticationService/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //const currentUser = this.authenticationService.currentUserValue;
        let currentUser1 = localStorage.getItem('currentUser');
        if (currentUser1!==null) {
            // authorised so return true
            // var currentUser2 = currentUser.Token_Attribute;
            // if (!currentUser2.isTokenExpired(currentUser2.Token_Attribute.value)){
            //if (!currentUser.isTokenExpired())
           // {
            let validToken = this.authenticationService.currentUserValue.Token_Attribute.validTo;
            
            if(validToken == null || Date.parse(validToken)<=Date.now())
            {
                
                this.authenticationService.logout();
                // console.log("test1"+validToken);
                // console.log("test1"+Date.parse(validToken));
                // console.log("test1"+Date.now());
                this.router.navigate(['/pages/login-boxed'], { queryParams: { returnUrl: state.url }});
                //localStorage.removeItem('currentUser');
                //this.authenticationService.logout();

                return false;
            }
            else 
            return true;
            //et v1=currentUser1.Token_Attribute;
           // }
        }
        else
        {
        // not logged in so redirect to login page with the return url
       
        this.router.navigate(['/pages/login-boxed'], { queryParams: { returnUrl: state.url }});
        localStorage.removeItem('currentUser');
        //this.authenticationService.logout();

        return false;
        }
        
    }
}