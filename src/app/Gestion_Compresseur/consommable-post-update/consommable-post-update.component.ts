import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/Shared/Gestion_Compresseur/Consommable/data.service";
import { MatDialogRef, MatSnackBar } from "@angular/material";
//import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Compresseur_Filiale/EquipementFiliale.model';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';

@Component({
  selector: "app-consommable-post-update",
  templateUrl: "./consommable-post-update.component.html",
  styles: []
})
export class ConsommablePostUpdateComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    public data: DataService,
    public dialogRef: MatDialogRef<ConsommablePostUpdateComponent>
  ) { }
  listF: Filiale[];
  listCF: EquipementFiliale[];
  ngOnInit() {
    this.data
      .getlistCF()
      .toPromise()
      .then(res => (this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true)));

    this.data.getConsommable();
  }

  onClear() {
    //this.data.form.reset();
    // this.data.initializeFormGroup();
    if (this.data.form.controls.consommableID.value ==
      "00000000-0000-0000-0000-000000000000") {
      this.data.initializeFormGroup();
      /////
    }
  }

  onSubmit() {
    if (
      this.data.form.controls.consommableID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  insertRecord() {
    this.data.insertConsommable().subscribe(
      res => {
        if (res == "Added done") {
          this.resetForm();
          this.dialogRef.close();
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

  updateRecord() {
    this.data.putConsommable().subscribe(
      res => {
        console.log("Put")
        if (res == "Update Done") {
          console.log("Update Done")
          this.resetForm();
          this.dialogRef.close();
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


  resetForm() {
    this.data.consommable = {
      consommableID: "",
      equipementFilialeID: "",
      consommationComp: 0,
      prixUnitaire: 0,
      fraisElectriciteMensuel: 0,

      date: new Date()
    };
  }
  onClose() {
    this.dialogRef.close();
  }
}
