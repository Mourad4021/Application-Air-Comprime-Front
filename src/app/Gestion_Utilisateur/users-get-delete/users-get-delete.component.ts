import { Component, OnInit } from "@angular/core";
import { DataUsersService } from "src/app/Shared/Gestion-Utilisateur/Users/dataUsers.service";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { Users } from "src/app/Shared/Gestion-Utilisateur/Users/users.model";
import { UsersPostUpdateComponent } from "../users-post-update/users-post-update.component";
import { FormBuilder } from "@angular/forms";
import { RoleAppPostUpdateComponent } from "../role-app-post-update/role-app-post-update.component";
import { AppRoleDataService } from "src/app/Shared/Gestion-Utilisateur/AppRole/app-role-data.service";
import { DataFilialeService } from "src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service";
import { Filiale } from "src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model";
import { AuthenticationService } from "src/app/Shared/AuthenticationService/authentication.service";

@Component({
  selector: "app-users-get-delete",
  templateUrl: "./users-get-delete.component.html",
  styles: []
})
export class UsersGetDeleteComponent implements OnInit {
  constructor(
    public data: DataUsersService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private dataFilialeservice: DataFilialeService,
    private appRoleDataService: AppRoleDataService,
    private _snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) { }
  UsersSearchForm = this.fb.group({
    usersName: [""],
    usersLastName: [""],
    filialeID: [""],
    usersMailIntern: [""]
  });
  //pagination variables
  p: number = 1;

  list: Filiale[];
  ngOnInit() {
    this.dataFilialeservice.getFiliale().subscribe(res => {
      this.dataFilialeservice.list = res as Filiale[];
    });
    this.data.getUsers();
  }
  edit(Users: Users) { }

  onEdit(Users: Users) {
    this.data.initializeFormGroupForEdit(Users);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "90%";
    //   dialogConfig.height = "80%";
    this.dialog.open(UsersPostUpdateComponent, dialogConfig);
  }
  delete(usersId) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.data.DeleteUsers(usersId).subscribe(
        res => {
          this.ngOnInit();
          if (res == "Delete Done") {
            this.dialog.closeAll();
            this.ngOnInit();
            this._snackBar.open(
              "La suppression a été effectuée avec succès",
              "X",
              {
                duration: 4000,
                verticalPosition: "top",
                horizontalPosition: "center",
                panelClass: ["green-snackbar"]
              }
            );
          }
        },
        err => {
          this._snackBar.open("Erreur", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        }
      );
    }
  }
  editRoleApp(userId: string, userName: string) {
    this.appRoleDataService.selectedUserName = userName;
    this.appRoleDataService.selectedUserID = userId;
    this.appRoleDataService.AddAppRoleToUserForm.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    this.dialog.open(RoleAppPostUpdateComponent, dialogConfig);
  }
  onCreate() {
    this.data.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "90%";
    // dialogConfig.height = "80%";
    this.dialog.open(UsersPostUpdateComponent, dialogConfig);
  }
  getFilialeNameById(filialeID: string) {
    return this.dataFilialeservice.list.find(x => x.filialeID == filialeID);
  }
}
