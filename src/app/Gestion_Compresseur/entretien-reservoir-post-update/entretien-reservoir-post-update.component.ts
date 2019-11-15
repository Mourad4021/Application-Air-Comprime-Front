import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { EntretienReservoirService } from 'src/app/Shared/Gestion_Compresseur/Entretien-Reservoir/entretien-reservoir.service';

@Component({
  selector: 'app-entretien-reservoir-post-update',
  templateUrl: './entretien-reservoir-post-update.component.html',
  styles: []
})
export class EntretienReservoirPostUpdateComponent implements OnInit {
  NatureDeVisite: any[] = ["Interieure", "Exterieure", "Officielle"];
  listCF: EquipementFiliale[] = new Array();
  constructor(private _snackBar: MatSnackBar,
    private data: EntretienReservoirService,
    private matDialog: MatDialog,
    public dataCF: EquipementFilialeService,


  ) { }


  ngOnInit() {
    this.dataCF.getactiveEquipementFilialeList().subscribe(
      res => this.listCF = (res as EquipementFiliale[])
    )
  }

  onClose() {
    this.matDialog.closeAll();
  }

  onClear() {
    (
      this.data.AddOrUpdateEntretienReservoirForm.controls.entretienReservoirID.value ==
      "00000000-0000-0000-0000-000000000000"
    )
    this.data.initializeAddOrUpdateEntretienReservoirFormForAdd();

  }

  onSubmit() {
    if (
      this.data.AddOrUpdateEntretienReservoirForm.controls.entretienReservoirID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertEntretienReservoir();
    } else {
      this.updateEntretienReservoir();
    }
  }

  insertEntretienReservoir() {

    this.data.postEntretienReservoir().subscribe(
      res => {
        if (res == "Added done") {
          this.onClear()
          this.matDialog.closeAll();
          this.data.refrechEntretienReservoirList();
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

  updateEntretienReservoir() {

    this.data.updateEntretienReservoir().subscribe(
      res => {
        if (res == "Update Done") {
          this.onClear()
          this.matDialog.closeAll();
          this.data.refrechEntretienReservoirList();
          this._snackBar.open(
            "La mise à jour a été effectuée avec succès",
            "X",
            {
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




}