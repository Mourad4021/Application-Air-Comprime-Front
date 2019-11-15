import { Component, OnInit } from "@angular/core";
import { DataUsersService } from "src/app/Shared/Gestion-Utilisateur/Users/dataUsers.service";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { Filiale } from "src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model";
import { AbstractControl } from '@angular/forms';

@Component({
  selector: "app-users-post-update",
  templateUrl: "./users-post-update.component.html",
  styles: []
})
export class UsersPostUpdateComponent implements OnInit {
  listFiliale: Filiale[];
  StatutList: any[] = ["True", "False"];
  GenreList: any[] = ["Femme", "Homme"];

  constructor(
    private _snackBar: MatSnackBar,
    public data: DataUsersService,
    public dialogRef: MatDialogRef<UsersPostUpdateComponent>
  ) { }

  ngOnInit() {
    this.data
      .getlistFiliale()
      .toPromise()
      .then(res => (this.listFiliale = (res as Filiale[]).filter(x => x.active == true)));
    this.data.getUsers();
  }

  onClear() {
    this.data.form.reset();
    // this.data.initializeFormGroup();
  }

  onSubmit() {
    if (
      this.data.form.controls.usersId.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.data.insertUsers().subscribe(
      res => {
        if (res == "Added done") {
          this.resetForm();
          this.dialogRef.close();
          this.ngOnInit();
          this._snackBar.open("L'ajout a été effectuée avec succès", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["green-snackbar"]
          });
        }
      },
      err => {
        console.log(err);
        this._snackBar.open("Erreur", "X", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["red-snackbar"]
        });
      }
    );
  }

  updateRecord() {
    this.data.putUsers().subscribe(
      res => {
        if (res == "Update Done") {
          this.resetForm();
          this.dialogRef.close();
          this.ngOnInit();
          this._snackBar.open(
            "La mise à jour a été effectuée avec succès",
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
        console.log(err);
        this._snackBar.open("Erreur", "X", {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["red-snackbar"]
        });
      }
    );
  }

  resetForm() {
    this.data.Users = {
      usersId: "00000000-0000-0000-0000-000000000000",
      usersCode: "",
      usersName: "",
      usersLastName: "",
      usersState: true,
      usersMail: "",
      usersMailIntern: "",
      usersPosteName: "",
      usersPhoneNumber: 0,
      usersPersonalNumber: 0,
      usersGenderCode: "",
      usersBirthDate: new Date(),
      usersJoinDate: new Date(),
      usersDateLeave: new Date(),
      filialeID: ""
    };
  }
  onClose() {
    this.dialogRef.close();
  }
}
