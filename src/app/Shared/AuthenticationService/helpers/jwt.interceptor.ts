import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   constructor(private authenticationService: AuthenticationService) {}

   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // authorization header with jwt token if available
       let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.Token_Attribute.value) {
       //     if (currentUser) {
           request = request.clone({
              setHeaders: { 
                  Authorization: `Bearer ${currentUser.Token_Attribute.value}`
               }
      });
    }

     return next.handle(request);
  }
}