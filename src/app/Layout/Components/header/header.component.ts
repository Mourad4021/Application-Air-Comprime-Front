import { Component, HostBinding } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { ThemeOptions } from '../../../theme-options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(public globals: ThemeOptions) {
  }
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  userName = this.currentUser.Nom_Utilisateur;
  appName = this.currentUser.Nom_Application;
  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

}
