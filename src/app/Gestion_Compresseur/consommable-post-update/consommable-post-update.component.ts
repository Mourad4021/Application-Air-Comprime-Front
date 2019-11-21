import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from 'src/app/Shared/Gestion_Compresseur/Consommable/data.service';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { Consommable } from 'src/app/Shared/Gestion_Compresseur/Consommable/consommable.model';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';

@Component({
  selector: "app-consommable-post-update",
  templateUrl: "./consommable-post-update.component.html",
  styles: []
})
export class ConsommablePostUpdateComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    public consommableService: DataService,
    private matDialog: MatDialog,
    private authService: AuthenticationService,
    public filialeService: DataFilialeService,
    public equipementFilialeService: EquipementFilialeService
  ) { }
  listFiliale: Filiale[] = new Array;


  ngOnInit() {

    this.filialeService.getActiveFiliale().subscribe(
      res => {
        this.filialeService.listActive = res as Filiale[]

        this.consommableService.getActiveCompresseursFiliales().subscribe(
          res => {
            this.consommableService.ActiveCompresseurFiliale = res as EquipementFiliale[]

            this.consommableService.getactiveConsommable().subscribe
              (
                res => {

                  this.consommableService.ActiveConsommable = res as Consommable[]

                })
          })
      })

  }

  onClear() {
    this.consommableService.initializeAddOrUpdateConsommableFormForAdd();
  }

  onSubmit() {
    if (
      this.consommableService.AddOrUpdateConsommableForm.controls.consommableID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {

      this.updateRecord();
    }
  }

  insertRecord() {
    let date = new Date()
    this.equipementFilialeService.getDateNow().subscribe(res => { date = res as Date })
    if (new Date(this.consommableService.AddOrUpdateConsommableForm.controls.date.value) <= date) {

      this.consommableService.postConsommable().subscribe(
        res => {
          if (res == "Added done") {
            this.consommableService.initializeAddOrUpdateConsommableFormForAdd();
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
          this._snackBar.open(
            "Erreur",
            "X",
            {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            }
          );

        }
      );
    }
    else {
      this._snackBar.open(
        "La date est invalide",
        "X",
        {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["red-snackbar"]
        }
      );
    }

  }

  updateRecord() {

    let date = new Date()
    this.equipementFilialeService.getDateNow().subscribe(res => { date = res as Date })
    if (new Date(this.consommableService.AddOrUpdateConsommableForm.controls.date.value) <= date) {
      this.consommableService.putConsommable().subscribe(
        res => {
          if (res == "Update Done") {
            this.consommableService.initializeAddOrUpdateConsommableFormForAdd();
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

          this._snackBar.open(
            "Erreur",
            "X",
            {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            }
          );
        }
      );
    }
    else {
      this._snackBar.open(
        "La date est invalide",
        "X",
        {
          duration: 4000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["red-snackbar"]
        }
      );
    }
  }



  onClose() {
    this.matDialog.closeAll();

  }
  GetCompresseurFilialeByIDCorrespondance(EquipementFilialeID: string) {
    return this.consommableService.ActiveCompresseurFiliale.find(f => f.equipementFilialeID == EquipementFilialeID);
  }

}
