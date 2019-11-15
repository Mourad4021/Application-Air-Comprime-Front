import { Component, OnInit } from "@angular/core";

import { Equipement } from "src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model";
import { EquipementDataService } from "src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service";
import { Fournisseur } from "src/app/Shared/Gestion Fournisseur/Fournisseur.model";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { GestionFournisseurDataService } from "src/app/Shared/Gestion Fournisseur/datafournisseur.service";
import { AuthenticationService } from "src/app/Shared/AuthenticationService/authentication.service";
import { SecheurPostUpdateComponent } from '../Secheur-post-update/Secheur-post-update.component';

@Component({
  selector: "app-Secheurs-get-delete",
  templateUrl: "./Secheurs-get-delete.component.html",
  styleUrls: []
})
export class SecheursGetDeleteComponent implements OnInit {
  constructor(
    private equipementDataService: EquipementDataService,
    private fournisseurDataService: GestionFournisseurDataService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  SecheurSearchForm = this.fb.group({
    nom: [''],
    fournisseurID: [""],
    constructeur: [""],
    capaciteTraitement: [""]
  });
  //pagination variables
  p: number = 1;

  ngOnInit() {
    this.fournisseurDataService.getFournisseur().subscribe(
      res => {
        this.fournisseurDataService.list = res as Fournisseur[]

      });
    this.equipementDataService.getactiveSecheurList().subscribe(
      res => {
        this.equipementDataService.listActiveSecheur = res as Equipement[]
      });

  }

  onCreateSecheur() {
    this.equipementDataService.initializeAddOrUpdateSecheurFormForAdd();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(SecheurPostUpdateComponent, dialogConfig);
  }

  GetFournisseurNameByIDCorrespondance(FournisseurId: string) {
    return this.fournisseurDataService.list.find(
      f => f.fournisseurID == FournisseurId
    );
  }
  onDelete(equipementID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.equipementDataService.putSecheurForFakeDelete(equipementID).subscribe(
        res => {
          if (res == "Update Done") {
            this.dialog.closeAll()
            this.ngOnInit()
            this._snackBar.open("La suppression a été effectuée avec succès", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["green-snackbar"]
            });

          }
        },
        err => {
          console.log("erreur");
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
  onGetSecheurList() {
    this.equipementDataService.getSecheurList().subscribe(
      res => {
        this.equipementDataService.ListSecheur = res as Equipement[];
      },
      () => { }
    );
  }

  onEdit(equipement: Equipement) {
    this.equipementDataService.initializeAddOrUpdateSecheurFormForEdit(
      equipement
    );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(SecheurPostUpdateComponent, dialogConfig);
  }


  getactiveSecheur() {
    this.equipementDataService.ListSecheur = new Array()
    this.equipementDataService.listActiveSecheur = new Array()
    this.equipementDataService.getSecheurList().subscribe(
      res => {

        this.equipementDataService.ListSecheur = res as Equipement[]
      },
      err => { },
      () => {

        this.equipementDataService.ListSecheur.forEach(element => {
          if (element.active == true) {
            this.equipementDataService.listActiveSecheur.push(element);
          }
        });
      })
  }


}
