import { Component, OnInit } from "@angular/core";
import { DataFilialeService } from "src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { Filiale } from "src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model";

@Component({
  selector: "app-filiale-post-update",
  templateUrl: "./filiale-post-update.component.html",
  styles: []
})
export class FilialePostUpdateComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    public data: DataFilialeService,
    public dialogRef: MatDialogRef<FilialePostUpdateComponent>
  ) {}

  ngOnInit() {
    this.getactiveFiliale();
  }

  onClear() {
    this.data.form.reset();
    // this.data.initializeFormGroup();
  }

  onSubmit() {
    if (
      this.data.form.controls.filialeID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.data.insertFiliale().subscribe(
      res => {
        if (res == "Added done") {
          this.resetForm();
          this.dialogRef.close();
          this.getactiveFiliale();
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
    this.data.putFiliale().subscribe(
      res => {
        if (res == "Update Done") {
          this.resetForm();
          this.dialogRef.close();
          this.getactiveFiliale();
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
    this.data.filiale = {
      filialeID: "",
      nom: "",
      code: "",
      conformite_d_Exploitation: "",
      active: null
    };
  }
  onClose() {
    this.dialogRef.close();
  }

  getactiveFiliale() {
    this.data.list = new Array();
    this.data.listActive = new Array();
    this.data.getFiliale().subscribe(
      res => {
        this.data.list = res as Filiale[];
      },
      err => {},
      () => {
        this.data.list.forEach(element => {
          if (element.active == true) {
            this.data.listActive.push(element);
          }
        });
      }
    );
  }
}
