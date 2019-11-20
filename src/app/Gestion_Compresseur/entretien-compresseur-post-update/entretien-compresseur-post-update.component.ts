import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Fournisseur } from 'src/app/Shared/Gestion Fournisseur/Fournisseur.model';
import { GestionFournisseurDataService } from 'src/app/Shared/Gestion Fournisseur/datafournisseur.service';
import { EntretienCompresseurService } from 'src/app/Shared/Gestion_Compresseur/Entretien-Compresseur/entretien-compresseur.service';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';

@Component({
  selector: 'app-entretien-compresseur-post-update',
  templateUrl: './entretien-compresseur-post-update.component.html',
  styles: []
})
export class EntretienCompresseurPostUpdateComponent implements OnInit {
  listCF: EquipementFiliale[] = new Array();
  constructor(private _snackBar: MatSnackBar,
    private data: EntretienCompresseurService,
    private matDialog: MatDialog,
    public dataCF: EquipementFilialeService,
    public dataFournisseur: GestionFournisseurDataService,
    public DataFicheCompresseur: EquipementDataService) { }
  ListF: Fournisseur[];
  ListFicheCompresseur: Equipement[];
  equipementFilialeID: string
  ngOnInit() {
    this.dataCF.getactiveEquipementFilialeList().subscribe(
      res => this.listCF = (res as EquipementFiliale[])
    )

    this.dataFournisseur.getFournisseur().subscribe(
      res => this.ListF = (res as Fournisseur[])
    )
    this.DataFicheCompresseur.getactiveCompresseurList().subscribe(
      res => this.ListFicheCompresseur = (res as Equipement[])
    )

  }
  onClose() {
    this.matDialog.closeAll();
  }

  onClear() {
    /// vidermourad
    if (this.data.AddOrUpdateEntretienCompresseurForm.controls.entretienCompresseurID.value ==
      "00000000-0000-0000-0000-000000000000") {
      this.data.initializeAddOrUpdateEntretienCompresseurFormForAdd();
      /////
    }

  }

  onSubmit() {
    if (
      this.data.AddOrUpdateEntretienCompresseurForm.controls.entretienCompresseurID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertEntretienCompresseur();
    } else {
      this.updateEntretienCompresseur();
    }
  }
  GetFrequenceByIDCorrespondance(equipementFilialeID: string) {

    let IDFicheCompresseur = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).equipementID;
    let IDfournisseur = this.ListFicheCompresseur.find(Fc => Fc.equipementID == IDFicheCompresseur).fournisseurID;
    return this.ListF.find(x => x.fournisseurID == IDfournisseur).frequence_Des_Entretiens_Compresseur;
  }
  insertEntretienCompresseur() {
    this.data.AddOrUpdateEntretienCompresseurForm.controls.valeurCompteurProchainEntretien.setValue(
      this.data.AddOrUpdateEntretienCompresseurForm.controls.priseCompteurDernierEntretienDernierEntretien.value + this.GetFrequenceByIDCorrespondance(this.data.AddOrUpdateEntretienCompresseurForm.controls.equipementFilialeID.value)

    );
    //= this.data.AddOrUpdateEntretienCompresseurForm.controls.priseCompteurDernierEntretienDernierEntretien.value + this.GetFrequenceByIDCorrespondance(this.data.AddOrUpdateEntretienCompresseurForm.controls.equipementFilialeID.value);

    this.data.postEntretienCompresseur().subscribe(
      res => {
        if (res == "Added done") {
          this.onClear()
          this.matDialog.closeAll();
          this.data.refrechEntretienCompresseurList();
          this._snackBar.open("L'ajout a été effectuée avec succès", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["green-snackbar"]
          });
        } else if (res == "la valeur du Prise de compteur lors du dernier Entretien doit être Inférieure ou égale à la valeur du Prise du compteur Actuelle ") {
          this._snackBar.open("la valeur du Prise de compteur lors du dernier Entretien doit être Inférieure ou égale à la valeur du Prise du compteur Actuelle ", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (
          res == "La date du dernier Entretien ne doit pas dépasser la date actuelle"
        ) {
          this._snackBar.open("La date du dernier Entretien ne doit pas dépasser la date actuelle", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        }

      },
      err => {
        console.log(err);
      }
    );
  }

  updateEntretienCompresseur() {
    this.data.updateEntretienCompresseur().subscribe(
      res => {
        if (res == "Update Done") {
          this.onClear()
          this.matDialog.closeAll();
          this.data.refrechEntretienCompresseurList();
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
        } else if (res == "la valeur du Prise de compteur lors du dernier Entretien doit être Inférieure ou égale à la valeur du Prise du compteur Actuelle ") {
          this._snackBar.open("la valeur du Prise de compteur lors du dernier Entretien doit être Inférieure ou égale à la valeur du Prise du compteur Actuelle", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (
          res == "La date du dernier Entretien ne doit pas dépasser la date actuelle"
        ) {
          this._snackBar.open("La date du dernier Entretien ne doit pas dépasser la date actuelle", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }




}
