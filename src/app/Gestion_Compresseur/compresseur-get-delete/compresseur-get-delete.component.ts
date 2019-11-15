import { Component, OnInit } from '@angular/core';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { GestionFournisseurDataService } from 'src/app/Shared/Gestion Fournisseur/datafournisseur.service';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Fournisseur } from 'src/app/Shared/Gestion Fournisseur/Fournisseur.model';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { CompresseurPostUpdateComponent } from '../compresseur-post-update/compresseur-post-update.component';

@Component({
  selector: 'app-compresseur-get-delete',
  templateUrl: './compresseur-get-delete.component.html',
  styles: []
})
export class CompresseurGetDeleteComponent implements OnInit {

  constructor(
    private equipementDataService: EquipementDataService,
    private fournisseurDataService: GestionFournisseurDataService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }
  CompresseurSearchForm = this.fb.group({
    nom: [''],
    fournisseurID: [""],
    constructeur: [""],
    puissance: [""],
    debit: [""],
    puissanceCharge: [""],
    puissanceVide: [""],
    frequence_Des_Entretiens_Compresseur: [""],
  });
  //pagination variables
  p: number = 1;
  ngOnInit() {
    this.fournisseurDataService.getFournisseur().subscribe(
      res => {
        this.fournisseurDataService.list = res as Fournisseur[]
      });

    this.equipementDataService.getactiveCompresseurList().subscribe(
      res => {
        this.equipementDataService.listActiveCompresseur = res as Equipement[]
      });
  }
  onCreateCompresseur() {
    this.equipementDataService.initializeAddOrUpdateCompresseurFormForAdd();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(CompresseurPostUpdateComponent, dialogConfig);
  }
  GetFournisseurNameByIDCorrespondance(FournisseurId: string) {
    return this.fournisseurDataService.list.find(
      f => f.fournisseurID == FournisseurId
    );
  }
  onDelete(equipementID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.equipementDataService.putCompresseurForFakeDelete(equipementID).subscribe(
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

  onGetCompresseurList() {
    this.equipementDataService.getCompresseurList().subscribe(
      res => {
        this.equipementDataService.ListCompresseur = res as Equipement[];
      },
      () => { }
    );
  }

  onEdit(equipement: Equipement) {
    this.equipementDataService.initializeAddOrUpdateCompresseurFormForEdit(
      equipement
    );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(CompresseurPostUpdateComponent, dialogConfig);
  }

  getactiveCompresseur() {
    this.equipementDataService.ListCompresseur = new Array()
    this.equipementDataService.listActiveCompresseur = new Array()
    this.equipementDataService.getCompresseurList().subscribe(
      res => {

        this.equipementDataService.ListCompresseur = res as Equipement[]
      },
      err => { },
      () => {

        this.equipementDataService.ListCompresseur.forEach(element => {
          if (element.active == true) {
            this.equipementDataService.listActiveCompresseur.push(element);
          }
        });
      })
  }
}
