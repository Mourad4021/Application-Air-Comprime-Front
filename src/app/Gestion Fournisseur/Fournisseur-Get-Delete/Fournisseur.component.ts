import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { FournisseurPostComponent } from "../Fournisseur-Post-Update/Fournisseur-post.component";
import { Fournisseur } from "../../Shared/Gestion Fournisseur/Fournisseur.model";

import { GestionFournisseurDataService } from "src/app/Shared/Gestion Fournisseur/datafournisseur.service";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "src/app/Shared/AuthenticationService/authentication.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-Fournisseur",
  templateUrl: "./Fournisseur.component.html",
  styles: []
})
export class FournisseurComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    public data: GestionFournisseurDataService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  FournisseurSearchForm = this.fb.group({
    nom: [""],
    constructeur: [""]
  });
  //pagination variables
  p: number = 1;

  ngOnInit() {
    this.getactiveFournisseur();
  }
  edit(fournisseur: Fournisseur) {}

  onEdit(fournisseur: Fournisseur) {
    this.data.initializeFormGroupForEdit(fournisseur);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    //dialogConfig.height = "100%";
    this.dialog.open(FournisseurPostComponent, dialogConfig);
  }
  delete(fournisseurID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.data.DeleteFournisseur(fournisseurID).subscribe(
        res => {
          if (res == "Update" + fournisseurID) {
            this.dialog.closeAll();
            this.getactiveFournisseur();
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
  onCreate() {
    this.data.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    //dialogConfig.height = "100%";
    this.dialog.open(FournisseurPostComponent, dialogConfig);
  }
  getactiveFournisseur() {
    this.data.list = new Array();
    this.data.listActive = new Array();
    this.data.getFournisseur().subscribe(
      res => {
        this.data.list = res as Fournisseur[];
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
