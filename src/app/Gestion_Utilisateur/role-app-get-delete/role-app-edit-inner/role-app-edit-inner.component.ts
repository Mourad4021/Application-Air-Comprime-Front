import { Component, OnInit, Input } from '@angular/core';
import { Application } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/application.model';
import { AppRoleDataService } from 'src/app/Shared/Gestion-Utilisateur/AppRole/app-role-data.service';
import { Role } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/role.model';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ChangePwdUserInAppComponent } from './change-pwd-user-in-app/change-pwd-user-in-app.component';

@Component({
  selector: 'app-role-app-edit-inner',
  templateUrl: './role-app-edit-inner.component.html',
  styles: []
})
export class RoleAppEditInnerComponent implements OnInit {
  @Input() applicationId: string
  application: Application;

  alllAppRoleForm = this.fb.group({
    appRoles: this.fb.array([])
  })
  constructor(private roleAppDataService: AppRoleDataService, private fb: FormBuilder, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.roleAppDataService.getRoles().subscribe(

      res => { this.roleAppDataService.roleList = res as Role[] }
    )

    this.roleAppDataService.getAppwithUsers(this.applicationId).subscribe(
      res => {
        this.application = res as Application


      },
      err => { },
      () => {
        this.application.ListeUtilisateurs.forEach(element => {
          if (this.roleAppDataService.listOfAppRoleMenu.find(x => x.UserId == element.UserID && x.appId == this.applicationId) != null) {

            let RoleId = this.roleAppDataService.listOfAppRoleMenu.find(x => x.UserId == element.UserID && x.appId == this.applicationId).RoleId
            this.addRow(element.UserID, RoleId, element.UserName)
          }



        });
      }
    )


  }

  //approle for array
  addRow(userId, roleId, userName) {

    const appRoles = this.alllAppRoleForm.controls.appRoles as FormArray;
    appRoles.push(this.fb.group({
      userName: [userName],// it's just additional for showing username
      userId: [userId, [Validators.required]],
      roleId: [roleId, [Validators.required]],
      oldRoleId: [roleId]
    }))
  }

  onChangePassword(userId: string, roleId: string) {

    this.roleAppDataService.changePasswordForm.controls.appId.setValue(this.applicationId);
    this.roleAppDataService.changePasswordForm.controls.userId.setValue(userId);
    this.roleAppDataService.changePasswordForm.controls.roleId.setValue(roleId);
    this.roleAppDataService.changePasswordForm.controls.password.setValue('');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    this.dialog.open(ChangePwdUserInAppComponent, dialogConfig);

  }

  onConfirmChangerole(currentformIndex) {

    const appRoles = this.alllAppRoleForm.controls.appRoles as FormArray;

    let currentform = appRoles.value[currentformIndex]
    this.roleAppDataService.putRoleToUserMenu(currentform.oldRoleId, currentform.roleId, currentform.userId).subscribe(
      res => {

        this._snackBar.open("La mise à jour du rôle a été effectué avec succés", "X", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["green-snackbar"]
        });
      },
      err => {

        this._snackBar.open("Erreur", "X", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["red-snackbar"]
        });
      }
    )
  }
}
