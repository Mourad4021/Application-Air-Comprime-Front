import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Fournisseur } from 'src/app/Shared/Gestion Fournisseur/Fournisseur.model';
import { GestionFournisseurDataService } from 'src/app/Shared/Gestion Fournisseur/datafournisseur.service';
import { EntretienCompresseurService } from 'src/app/Shared/Gestion_Compresseur/Entretien-Compresseur/entretien-compresseur.service';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';

@Component({
  selector: 'app-entretien-compresseur-post-update',
  templateUrl: './entretien-compresseur-post-update.component.html',
  styles: []
})
export class EntretienCompresseurPostUpdateComponent implements OnInit {
  listCF: EquipementFiliale[] = new Array();
  listCFParFiliale: EquipementFiliale[]
  constructor(private _snackBar: MatSnackBar,
    private data: EntretienCompresseurService,
    private matDialog: MatDialog,
    public dataCF: EquipementFilialeService,
    public datafiliale: DataFilialeService,
    public dataFournisseur: GestionFournisseurDataService,
    private authenticationService: AuthenticationService,
    public DataFicheCompresseur: EquipementDataService,
  ) { }
  frequence1: number = 0
  frequence: number = 0
  frequence3: number = 0
  frequence4: number = 4
  ListF: Fournisseur[];
  ListFicheCompresseur: Equipement[];
  equipementFilialeID: string
  ListFournisseur: Fournisseur[]
  ngOnInit() {

    let currentUser = this.authenticationService.currentUserValue;
    this.dataCF.userRole = currentUser.Role_Utilisateur;
    this.dataCF.filialeId = currentUser.Filiale_Utilisateur;
    this.dataCF.getCompresseurFilialeParFilialeID().subscribe(
      res => this.listCFParFiliale = (res as EquipementFiliale[])
    )

    this.dataFournisseur.getFournisseur().subscribe(
      res => (this.ListFournisseur = res as Fournisseur[])
    )

    this.datafiliale.getFiliale().subscribe(res => { this.datafiliale.list = res as Filiale[] });
    this.DataFicheCompresseur.getCompresseurList().subscribe(res => { this.DataFicheCompresseur.ListEquipement = res as Equipement[] });

  }
  onClose() {
    this.matDialog.closeAll();
  }
  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;

    return this.datafiliale.list.find(x => x.filialeID == a);
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
  // GetFrequenceByIDCorrespondance(equipementFilialeID: string) {
  //   
  //   let IDFicheCompresseur = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).equipementID;
  //   
  //   let IDfournisseur = this.ListFicheCompresseur.find(Fc => Fc.equipementID == IDFicheCompresseur).fournisseurID;
  //   
  //   return this.ListF.find(x => x.fournisseurID == IDfournisseur).frequence_Des_Entretiens_Compresseur;
  //   
  // }

  GetFrequenceEntretienByIDCorrespondance(equipementFilialeID: string) {
    let IDFicheCompresseur = this.listCFParFiliale.find(cf => cf.equipementFilialeID == equipementFilialeID).equipementID;
    let IDfournisseur = this.DataFicheCompresseur.ListEquipement.find(Fc => Fc.equipementID == IDFicheCompresseur).fournisseurID;
    return this.ListFournisseur.find(x => x.fournisseurID == IDfournisseur).frequence_Des_Entretiens_Compresseur;
  }

  sum(val1: number, val2: number) {
    return val1 + val2
  }
  insertEntretienCompresseur() {


    this.frequence = this.GetFrequenceEntretienByIDCorrespondance(this.data.AddOrUpdateEntretienCompresseurForm.controls.equipementFilialeID.value);
    this.frequence1 = this.data.AddOrUpdateEntretienCompresseurForm.controls.priseCompteurDernierEntretien.value;
    var s: number = Number(this.frequence1) + Number(this.frequence);
    this.data.AddOrUpdateEntretienCompresseurForm.controls.valeurCompteurProchainEntretien.setValue(s)






    //= this.data.AddOrUpdateEntretienCompresseurForm.controls.priseCompteurDernierEntretien.vale + this.GetFrequenceByIDCorrespondance(this.data.AddOrUpdateEntretienCompresseurForm.controls.equipementFilialeID.value);
    // this.data.AddOrUpdateEntretienCompresseurForm.controls.valeurCompteurProchainEntretien.value == 0
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
    this.frequence4 = this.GetFrequenceEntretienByIDCorrespondance(this.data.AddOrUpdateEntretienCompresseurForm.controls.equipementFilialeID.value);
    this.frequence3 = this.data.AddOrUpdateEntretienCompresseurForm.controls.priseCompteurDernierEntretien.value;
    var sum: number = Number(this.frequence4) + Number(this.frequence3);
    this.data.AddOrUpdateEntretienCompresseurForm.controls.valeurCompteurProchainEntretien.setValue(sum)


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
