import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './Shared/AuthenticationService/authentication.service';
import { NotificationService } from './Shared/Notification/notification.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {
  title = 'Poulina Group Holding App';

  currentUser: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private url: LocationStrategy
  ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x

    });


    if (performance.navigation.type == 1 && this.url.path() != '/GestionCompresseur/') {
      this.notificationService.Notification();
    }
  }

  logout() {
    this.notificationService.toastr.clear();
    this.authenticationService.logout();
    this.router.navigate(['/pages/login-boxed']);
  }
}
