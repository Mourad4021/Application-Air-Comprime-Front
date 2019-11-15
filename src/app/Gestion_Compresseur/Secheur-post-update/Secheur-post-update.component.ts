import { Component, OnInit } from "@angular/core";
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { MatDialog, MatSnackBar } from '@angular/material';

import { Fournisseur } from 'src/app/Shared/Gestion Fournisseur/Fournisseur.model';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { GestionFournisseurDataService } from 'src/app/Shared/Gestion Fournisseur/datafournisseur.service';

@Component({
  selector: "app-Secheur-post-update",
  templateUrl: "./Secheur-post-update.component.html",
  styleUrls: []
})
export class SecheurPostUpdateComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, private equipementDataService: EquipementDataService, private fournisseurDataService: GestionFournisseurDataService, private matDialog: MatDialog) { }
  listFournisseur: Fournisseur[] = new Array;
  ngOnInit() {
    this.fournisseurDataService.getFournisseur().subscribe(
      res => this.listFournisseur = (res as Fournisseur[]).filter(x => x.active == true)
    )
    this.getactiveSecheur()
  }
  onClose() {
    this.matDialog.closeAll();
  }

  onClear() {
    this.equipementDataService.initializeAddOrUpdateSecheurFormForAdd();
  }
  onSubmit() {
    if (
      this.equipementDataService.AddOrUpdateSecheurForm.controls.equipementID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.equipementDataService.postSecheur().subscribe(
      res => {
        if (res == "Added done") {
          this.equipementDataService.initializeAddOrUpdateSecheurFormForAdd();
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
    this.equipementDataService.putSecheur().subscribe(
      res => {
        if (res == "Update Done") {
          this.equipementDataService.initializeAddOrUpdateSecheurFormForAdd();
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