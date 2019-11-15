import { AppComponent } from './../../../../../app.component';
import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { Router } from '@angular/router';



@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  currentUser: any;

  constructor(public globals: ThemeOptions, private router: Router,
    private authenticationService: AppComponent) {
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    
}

}