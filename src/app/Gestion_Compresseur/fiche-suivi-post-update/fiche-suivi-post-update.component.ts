import { Component, OnInit } from "@angular/core";
//import { CompresseurFiliale } from "src/app/Shared/Gestion_Compresseur/Compresseur_Filiale/compresseurfiliale.model";
import { DataService } from "src/app/Shared/Gestion_Compresseur/Fiche_Suivi/data.service";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { FicheSuivi } from 'src/app/Shared/Gestion_Compresseur/Fiche_Suivi/fiche-suivi.model';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';

@Component({
  selector: "app-fiche-suivi-post-update",
  templateUrl: "./fiche-suivi-post-update.component.html",
  styleUrls: []
})
export class FicheSuiviPostUpdateComponent implements OnInit {
  listCF: EquipementFiliale[];

  lastFSInThisMonth: boolean;
  // equipementFilialeHaveDebimetreIndex?: boolean;
  // equipementFilialeHaveElectricCounter?: boolean;
  constructor(
    private _snackBar: MatSnackBar,
    public data: DataService,
    public dialogRef: MatDialogRef<FicheSuiviPostUpdateComponent>,
    private authService: AuthenticationService,
    public datafiliale: DataFilialeService,
  ) { }

  ngOnInit() {
    this.lastFSInThisMonth = false;

    this.data
      .getlistCopresseur_Secheur()
      .toPromise()
      .then(res => {
        if (this.authService.currentUserValue.Role_Utilisateur == 'Admin' || this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
          this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true && x.filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
          console.log(res as EquipementFiliale[]);

        }
        else {
          this.listCF = res as EquipementFiliale[]
        }
      }

      );

    this.data.getFicheSuivi();



  }

  // OnCompressorSelectionChange(equipementFilialeID: string) {

  //   this.equipementFilialeHaveDebimetreIndex = this.GetCompFilialeByIDCorrespondance(equipementFilialeID).haveDebitMetre;
  //   debugger
  //   this.equipementFilialeHaveElectricCounter = this.GetCompFilialeByIDCorrespondance(equipementFilialeID).haveElectricCounter;

  // }
  GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
    debugger
    return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID);
  }
  onClear() {
    this.data.form.reset();
    // this.data.initializeFormGroup();
  }

  onSubmit() {
    if (
      this.data.form.controls.ficheSuiviID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {

      this.insertRecord();
    } else {

      this.updateRecord();
    }
  }

  insertRecord() {

    this.data.insertFicheSuivi().subscribe(
      res => {
        if (res == "Added done") {
          this.resetForm();
          this.refrechFicheSuiviList();
          this.dialogRef.close();
          // this.ngOnInit();
          this._snackBar.open("L'ajout a été effectuée avec succès", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["green-snackbar"]
          });
        } else if (res == "Index lower than the previous index") {
          this._snackBar.open("L'index électrique est invalide", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (
          res == "Total number of hours less than the number of hours in charge"
        ) {
          this._snackBar.open("Le nombre total d'heures est invalide", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (
          res == "Date superior to the date of today" ||
          res == "Week-end"
        ) {
          this._snackBar.open("La date est invalide", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (res == "The last day of the previous month not completed") {
          this._snackBar.open(
            "La fiche suivi du dernier jour du mois précédent n'est pas trouvée",
            "X",
            {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            }
          );
        } else if (res == "Existing Fiche_suivi at this date") {
          this._snackBar.open(
            "Une fiche suivi existe déja avec cette date",
            "X",
            {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            }
          );
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  updateRecord() {
    this.data.putFicheSuivi().subscribe(

      res => {

        if (res == "Update Done") {
          this.resetForm();
          this.refrechFicheSuiviList();
          this.dialogRef.close();
          // this.ngOnInit();
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
        } else if (res == "Index lower than the previous index") {
          this._snackBar.open("L'index électrique est invalide", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (
          res == "Total number of hours less than the number of hours in charge"
        ) {

          this._snackBar.open("Le nombre total d'heures est invalide", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (res == "Fiche suivi don't exist") {
          this._snackBar.open("La fiche suivi n'existe pas", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (
          res == "Date superior to the date of today" ||
          res == "Week-end"
        ) {

          this._snackBar.open("La date est invalide", "X", {
            duration: 4000,
            verticalPosition: "top",
            horizontalPosition: "center",
            panelClass: ["red-snackbar"]
          });
        } else if (res == "The last day of the previous month not completed") {
          this._snackBar.open(
            "La fiche suivi du dernier jour du mois précédent n'est pas trouvée",
            "X",
            {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            }
          );
        } else if (res == "Existing Fiche_suivi at this date") {
          this._snackBar.open(
            "Une fiche suivi existe déja avec cette date",
            "X",
            {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            }
          );
        }
      },
      err => {

        console.log(err);
      }
    );
  }

  resetForm() {
    this.data.form.reset({
      ficheSuiviID: "00000000-0000-0000-0000-000000000000",
      equipementFilialeID: "00000000-0000-0000-0000-000000000000",
      date: new Date(),
      nbre_Heurs_Total: 0,
      nbre_Heurs_Charge: 0,
      index_Electrique: 0,
      tempsArret: 0,
      etat: "",
      pointDeRoseeDuSecheur: "",
      index_Debitmetre: 0,
      fraisEntretienReparation: 0,
      priseCompteurDernierEntretien: 0,
      tHuileC: 0,
      typeDernierEntretien: "",
      remarques: ""
    });

  }
  OnfraisEntretienReparationChange() {


    if (this.data.form.controls.fraisEntretienReparation.value != 0) {
      this.data.form.controls.files.setValidators([Validators.required]);
    }
    else {
      this.data.form.controls.files.clearValidators();
    }
    this.data.form.controls.files.updateValueAndValidity();



  }
  OnIsLastFicheSuiviInMonthChange(event) {

    this.lastFSInThisMonth = event
    if (this.lastFSInThisMonth) {
      this.data.form.controls.nombreDeJoursOuvrablesDuMois.setValidators([Validators.required, Validators.max(31), Validators.min(0)]);
    }
    else {
      this.data.form.controls.nombreDeJoursOuvrablesDuMois.clearValidators();
    }
    this.data.form.controls.nombreDeJoursOuvrablesDuMois.updateValueAndValidity();



  }
  onClose() {
    this.dialogRef.close();
  }
  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
    return this.datafiliale.list.find(x => x.filialeID == a);
  }
  refrechFicheSuiviList() {
    debugger
    this.data.changeDetect = !this.data.changeDetect;
  }
}
