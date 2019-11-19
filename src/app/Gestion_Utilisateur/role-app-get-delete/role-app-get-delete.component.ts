import { Component, OnInit } from '@angular/core';
import { AppRoleDataService } from 'src/app/Shared/Gestion-Utilisateur/AppRole/app-role-data.service';
import { Application } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/application.model';
import { Role } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/role.model';
import { AppRoleMenu } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/appRoleMenu.model';

@Component({
  selector: 'app-role-app-get-delete',
  templateUrl: './role-app-get-delete.component.html',
  styles: []
})
export class RoleAppGetDeleteComponent implements OnInit {

  constructor(private roleAppDataService: AppRoleDataService) { }

  ngOnInit() {

    this.onGetRoleAssociatedToUserMenu()
    this.roleAppDataService.getApplications()
      .subscribe(
        res => {
          this.roleAppDataService.applicationList = res as Application[]
        },
        () => {

        }

      )
    this.roleAppDataService.getRoles().subscribe(

      res => { this.roleAppDataService.roleList = res as Role[] }
    )

  }


  onGetRoleAssociatedToUserMenu() {


    this.roleAppDataService.getRoleAssociatedToUserMenu().subscribe(
      res => {
        debugger
        (res as any[]).forEach(element => {
          this.roleAppDataService.listOfAppRoleMenu.push({ RoleId: element.role["RoleID"], UserId: element.user["UserID"], appId: element.menus['Application ID'] })


        });

        console.log(this.roleAppDataService.listOfAppRoleMenu);

      }
    )
  }
}
