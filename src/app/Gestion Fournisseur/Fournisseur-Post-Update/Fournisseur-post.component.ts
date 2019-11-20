import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { GestionFournisseurDataService } from "src/app/Shared/Gestion Fournisseur/datafournisseur.service";
import { Fournisseur } from "src/app/Shared/Gestion Fournisseur/Fournisseur.model";

@Component({
  selector: "app-Fournisseur-post",
  templateUrl: "./Fournisseur-post.component.html",
  styleUrls: []
})
export class FournisseurPostComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    public data: GestionFournisseurDataService,
    public dialogRef: MatDialogRef<FournisseurPostComponent>
  ) { }

  ngOnInit() {
    this.data.getFournisseur();
  }

  onClear() {
    //this.data.form.reset();
    //this.data.initializeFormGroup();
    if (this.data.form.controls.fournisseurID.value ==
      "00000000-0000-0000-0000-000000000000") {
      this.data.initializeFormGroup();
      /////
    }
  }
  onSubmit() {
    if (
      this.data.form.controls.fournisseurID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.data.insertFournisseur().subscribe(
      res => {
        if (res == "Aded done") {
          this.resetForm();
          this.dialogRef.close();
          this.getactiveFournisseur();
          this._snackBar.open("L'ajout a été effectuée avec succès", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["green-snackbar"]
          });
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

  updateRecord() {
    this.data.putFournisseur().subscribe(
      res => {
        if (res == "Update" + this.data.form.controls.fournisseurID.value) {
          this.resetForm();
          this.dialogRef.close();
          this.getactiveFournisseur();
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
    this.data.fournisseur = {
      fournisseurID: "",
      nom: "",
      constructeur: "",
      frequence_Des_Entretiens_Compresseur: 0,
      frequence_Des_Entretiens_Secheur: 0,
      adresse: "",
      email: "",
      active: null
    };
  }
  onClose() {
    this.dialogRef.close();
  }

  getactiveFournisseur() {
    this.data.list = new Array();
    this.data.listActive = new Array();
    this.data.getFournisseur().subscribe(
      res => {
        this.data.list = res as Fournisseur[];
      },
      err => { },
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
