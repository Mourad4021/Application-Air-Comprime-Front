import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';

@Component({
  selector: 'app-reservoir-post-update',
  templateUrl: './reservoir-post-update.component.html',
  styles: []
})
export class ReservoirPostUpdateComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private equipementDataService: EquipementDataService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getactiveReservoir()
  }
  onClose() {
    this.matDialog.closeAll();
  }
  onClear() {
    this.equipementDataService.initializeAddOrUpdateReservoirFormForAdd();
  }
  onSubmit() {
    if (
      this.equipementDataService.AddOrUpdateReservoirForm.controls.equipementID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }
  insertRecord() {
    this.equipementDataService.postReservoir().subscribe(
      res => {
        if (res == "Added done") {
          this.equipementDataService.initializeAddOrUpdateReservoirFormForAdd();
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
    this.equipementDataService.putReservoir().subscribe(
      res => {
        if (res == "Update Done") {
          this.equipementDataService.initializeAddOrUpdateReservoirFormForAdd();
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
  getactiveReservoir() {
    this.equipementDataService.ListReservoir = new Array()
    this.equipementDataService.listActiveReservoir = new Array()
    this.equipementDataService.getReservoirList().subscribe(
      res => {
        this.equipementDataService.ListReservoir = res as Equipement[]
      },
      err => { },
      () => {

        this.equipementDataService.ListReservoir.forEach(element => {
          if (element.active == true) {
            this.equipementDataService.listActiveReservoir.push(element);
          }
        });
      })


  }
}
