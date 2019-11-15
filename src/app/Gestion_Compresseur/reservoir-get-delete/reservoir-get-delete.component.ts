import { Component, OnInit } from '@angular/core';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { GestionFournisseurDataService } from 'src/app/Shared/Gestion Fournisseur/datafournisseur.service';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { FormBuilder } from '@angular/forms';
import { ReservoirPostUpdateComponent } from '../reservoir-post-update/reservoir-post-update.component';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';

@Component({
  selector: 'app-reservoir-get-delete',
  templateUrl: './reservoir-get-delete.component.html',
  styles: []
})
export class ReservoirGetDeleteComponent implements OnInit {

  constructor(
    private equipementDataService: EquipementDataService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ReservoirSearchForm = this.fb.group({
    nom: [''],
    anneeFabrication: [""],
    pms: [""],
    pe: [""]
  });
  //pagination variables
  p: number = 1;

  ngOnInit() {
    this.equipementDataService.getactiveReservoirList().subscribe(
      res => {
        this.equipementDataService.listActiveReservoir = res as Equipement[]
      });
  }
  onCreateReservoir() {
    this.equipementDataService.initializeAddOrUpdateReservoirFormForAdd();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(ReservoirPostUpdateComponent, dialogConfig);
  }

  onDelete(equipementID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.equipementDataService.putReservoirForFakeDelete(equipementID).subscribe(
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

  onGetSecheurList() {
    this.equipementDataService.getReservoirList().subscribe(
      res => {
        this.equipementDataService.ListReservoir = res as Equipement[];
      },
      () => { }
    );
  }
  onEdit(equipement: Equipement) {
    this.equipementDataService.initializeAddOrUpdateReservoirFormForEdit(
      equipement
    );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(ReservoirPostUpdateComponent, dialogConfig);
  }



}
