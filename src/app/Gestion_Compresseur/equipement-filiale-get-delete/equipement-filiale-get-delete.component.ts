import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { EquipementFilialePostUpdateComponent } from '../equipement-filiale-post-update/equipement-filiale-post-update.component';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';

@Component({
  selector: 'app-equipement-filiale-get-delete',
  templateUrl: './equipement-filiale-get-delete.component.html',
  styles: []
})
export class EquipementFilialeGetDeleteComponent implements OnInit {

  constructor(
    private equipementDataService: EquipementDataService,
    private dataFilialeService: DataFilialeService,
    private equipementFilialeService: EquipementFilialeService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  CompresseurSecheurFilialeForm = this.fb.group({
    filialeID: [''],
    equipementID: [""],
    nom: [""],
    numSerie: [""],
    prixAcquisition: [""],
    dateAcquisition: [""]
  });
  //pagination variables
  p: number = 1;


  ngOnInit() {
    this.dataFilialeService.getFiliale().subscribe(
      res => {
        this.dataFilialeService.list = (res as Filiale[]).filter(x => x.active == true)
        this.equipementDataService.getEquipementList().subscribe(
          res => {
            this.equipementDataService.ListEquipement = (res as Equipement[]).filter(x => x.active == true)

            if (this.authService.currentUserRole == "Responsable") {
              this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                res => {
                  this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                    .filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
                });
            }
            else {
              this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                res => {
                  this.equipementFilialeService.CompresseurSecheurFilialeList = res as EquipementFiliale[]
                });
            }

          });

      });

  }


  onCreateCompresseurSecheurFiliale() {
    this.equipementFilialeService.initializeAddOrUpdateCompresseurSecheurFilialeForAdd();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(EquipementFilialePostUpdateComponent, dialogConfig);
  }



  GetFilialeNameByIDCorrespondance(filialeID: string) {

    return this.dataFilialeService.list.filter(x => x.active == true).find(
      f => f.filialeID == filialeID

    );

  }
  GetEquipementNameByIDCorrespondance(equipementID: string) {

    return this.equipementDataService.ListEquipement.find(
      f => f.equipementID == equipementID
    );
  }

  onDeleteCompresseurSecheurFiliale(equipementFilialeID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.equipementFilialeService.putCompresseurSecheurFilialeForFakeDelete(equipementFilialeID).subscribe(
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
  onGetCompresseurSecheurFiliale() {
    this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
      res => {
        this.equipementFilialeService.CompresseurSecheurFilialeList = res as EquipementFiliale[];
      },
      () => { }
    );
  }

  onEditCompresseurSecheurFiliale(CompresseurSecheurFiliale: EquipementFiliale) {
    this.equipementFilialeService.initializeAddOrUpdateCompresseurSecheurFilialeForEdit(
      CompresseurSecheurFiliale
    );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(EquipementFilialePostUpdateComponent, dialogConfig);
  }

}
