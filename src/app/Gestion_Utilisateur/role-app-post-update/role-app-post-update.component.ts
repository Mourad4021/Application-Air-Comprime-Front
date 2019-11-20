import { Component, OnInit } from '@angular/core';
import { AppRoleDataService } from 'src/app/Shared/Gestion-Utilisateur/AppRole/app-role-data.service';
import { Application } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/application.model';
import { Role } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/role.model';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-role-app-post-update',
  templateUrl: './role-app-post-update.component.html',
  styles: []
})
export class RoleAppPostUpdateComponent implements OnInit {

  constructor(private roleAppDataService: AppRoleDataService, private madialog: MatDialog) { }

  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  RespRoleList: Role[]
  ngOnInit() {

    this.roleAppDataService.getApplications()
      .subscribe(
        res => {
          this.roleAppDataService.applicationList = res as Application[]
        },
        () => { }
      )


    this.roleAppDataService.getRoles()
      .subscribe(
        res => {
          this.roleAppDataService.roleList = res as Role[];
          this.RespRoleList = (res as Role[]).filter(x => x.RoleDisplayName == "Responsable");

        }
      )
  }



  onPost() {
    this.roleAppDataService.postApplicationToUser().subscribe(
      res => {
        // console.log(res);

      },
      () => {

      }
    )
    this.roleAppDataService.postRoleToUserMenu().subscribe(res => {
      this.madialog.closeAll();

    })
  }

}
