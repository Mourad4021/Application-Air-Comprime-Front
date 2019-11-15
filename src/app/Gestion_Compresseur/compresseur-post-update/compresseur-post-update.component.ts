import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { GestionFournisseurDataService } from 'src/app/Shared/Gestion Fournisseur/datafournisseur.service';
import { Fournisseur } from 'src/app/Shared/Gestion Fournisseur/Fournisseur.model';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';

@Component({
  selector: 'app-compresseur-post-update',
  templateUrl: './compresseur-post-update.component.html',
  styles: []
})
export class CompresseurPostUpdateComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private equipementDataService: EquipementDataService,
    private fournisseurDataService: GestionFournisseurDataService,
    private matDialog: MatDialog
  ) { }
  listFournisseur: Fournisseur[] = new Array;
  ngOnInit() {
    this.fournisseurDataService.getFournisseur().subscribe(
      res => this.listFournisseur = (res as Fournisseur[]).filter(x => x.active == true)
    )
    this.getactiveCompresseur()
  }
  onClose() {
    this.matDialog.closeAll();
  }

  onClear() {
    this.equipementDataService.initializeAddOrUpdateCompresseurFormForAdd();
  }
  onSubmit() {
    if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.equipementID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }
  insertRecord() {
    if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceCharge.value > 0 &&
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceVide.value >= 0
    ) {
      this.equipementDataService.postCompresseur().subscribe(
        res => {
          if (res == "Added done") {
            this.equipementDataService.initializeAddOrUpdateCompresseurFormForAdd();
            this.matDialog.closeAll();
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

          this._snackBar.open("Erreur", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        }
      );
    }
    else if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceCharge.value <= 0 &&
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceVide.value >= 0
    ) {

      this._snackBar.open("La 'Puissance en charge' doit être strictement supérieure à 0 kW", "X", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    }
    else if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceCharge.value > 0 &&
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceVide.value < 0
    ) {

      this._snackBar.open("La 'Puissance à vide' doit être supérieure ou égale à 0 kW", "X", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    }
    else if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceCharge.value <= 0 &&
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceVide.value < 0
    ) {

      this._snackBar.open("La 'Puissance en charge' et la 'Puissance à vide' doivent être supérieures à 0 kW", "X", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    }
  }









  updateRecord() {
    if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceCharge.value > 0 &&
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceVide.value >= 0
    ) {
      this.equipementDataService.putCompresseur().subscribe(
        res => {
          if (res == "Update Done") {
            this.equipementDataService.initializeAddOrUpdateCompresseurFormForAdd();
            this.matDialog.closeAll();
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
    else if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceCharge.value <= 0 &&
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceVide.value >= 0
    ) {

      this._snackBar.open("La 'Puissance en charge' doit être strictement supérieure à 0 kW", "X", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    }
    else if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceCharge.value > 0 &&
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceVide.value < 0
    ) {

      this._snackBar.open("La 'Puissance à vide' doit être supérieure ou égale à 0 kW", "X", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    }
    else if (
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceCharge.value <= 0 &&
      this.equipementDataService.AddOrUpdateCompresseurForm.controls.puissanceVide.value < 0
    ) {

      this._snackBar.open("La 'Puissance en charge' et la 'Puissance à vide' doivent être supérieures à 0 kW", "X", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    }


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
