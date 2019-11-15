import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';


export interface TypeEquipement {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-equipement-filiale-post-update',
  templateUrl: './equipement-filiale-post-update.component.html',
  styles: []
})

export class EquipementFilialePostUpdateComponent implements OnInit {

  selectedType: number = 1;
  listEquipement: Equipement[]
  Types: TypeEquipement[] = [
    { value: '1', viewValue: 'Compresseur' },
    { value: '2', viewValue: 'Secheur' }
  ];

  constructor(private _snackBar: MatSnackBar,
    private dataFilialeService: DataFilialeService,
    private equipementDataService: EquipementDataService,
    private equipementFilialeService: EquipementFilialeService,
    private authService: AuthenticationService,
    private matDialog: MatDialog) { }

  ngOnInit() {


    if (this.authService.currentUserRole == "Responsable") {
      this.dataFilialeService.getFiliale().subscribe(
        res => {
          this.dataFilialeService.list = (res as Filiale[]).filter(x => x.active == true).filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
          if (this.selectedType == 1) {
            this.equipementDataService.getactiveCompresseurList().subscribe(
              res => {
                this.listEquipement = new Array();
                this.listEquipement = res as Equipement[]
                if (this.authService.currentUserRole == "Responsable") {
                  this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                    res => {
                      this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                        .filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
                    });
                }
                else if (this.authService.currentUserRole != "Responsable") {
                  this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                    res => {
                      this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                    });
                }
              });
          }

          else if (this.selectedType == 2) {
            this.equipementDataService.getactiveSecheurList().subscribe(
              res => {
                this.listEquipement = new Array();
                this.listEquipement = res as Equipement[]
                if (this.authService.currentUserRole == "Responsable") {
                  this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                    res => {
                      this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                        .filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
                    });
                }
                else if (this.authService.currentUserRole != "Responsable") {
                  this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                    res => {
                      this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                    });
                }
              });
          }




        });
    }



    else if (this.authService.currentUserRole != "Responsable") {
      this.dataFilialeService.getFiliale().subscribe(
        res => {
          this.dataFilialeService.list = (res as Filiale[]).filter(x => x.active == true)
          if (this.selectedType == 1) {
            this.equipementDataService.getactiveCompresseurList().subscribe(
              res => {
                this.listEquipement = new Array();
                this.listEquipement = res as Equipement[]
                if (this.authService.currentUserRole == "Responsable") {
                  this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                    res => {
                      this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                        .filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
                    });
                }
                else if (this.authService.currentUserRole != "Responsable") {
                  this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                    res => {
                      this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                    });
                }
              });
          }

          else if (this.selectedType == 2) {
            this.equipementDataService.getactiveSecheurList().subscribe(
              res => {
                this.listEquipement = new Array();
                this.listEquipement = res as Equipement[]
                if (this.authService.currentUserRole == "Responsable") {
                  this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                    res => {
                      this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                        .filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
                    });
                }
                else if (this.authService.currentUserRole != "Responsable") {
                  this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
                    res => {
                      this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                    });
                }
              });
          }




        });
    }
  }




  onSelectedTypeChange(typeValue) {


    if (typeValue.value == 1) {
      this.equipementDataService.getactiveCompresseurList().subscribe(
        res => {
          this.listEquipement = new Array();
          this.listEquipement = res as Equipement[]
          if (this.authService.currentUserRole == "Responsable") {
            this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
              res => {
                this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                  .filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
              });
          }
          else if (this.authService.currentUserRole != "Responsable") {
            this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
              res => {
                this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
              });
          }
        });
    }

    else if (typeValue.value == 2) {
      this.equipementDataService.getactiveSecheurList().subscribe(
        res => {
          this.listEquipement = new Array();
          this.listEquipement = res as Equipement[]
          if (this.authService.currentUserRole == "Responsable") {
            this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
              res => {
                this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
                  .filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
              });
          }
          else if (this.authService.currentUserRole != "Responsable") {
            this.equipementFilialeService.getCompresseurSecheurFiliale().subscribe(
              res => {
                this.equipementFilialeService.CompresseurSecheurFilialeList = (res as EquipementFiliale[])
              });
          }
        });
    }





  }
  onClose() {
    this.matDialog.closeAll();

  }

  onClear() {
    this.equipementFilialeService.initializeAddOrUpdateCompresseurSecheurFilialeForAdd();
  }
  onSubmit() {
    if (
      this.equipementFilialeService.AddOrUpdateCompresseurSecheurFiliale.controls.equipementFilialeID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  insertRecord() {

    if (this.equipementFilialeService.AddOrUpdateCompresseurSecheurFiliale.controls.prixAcquisition.value > 0
    ) {

      this.equipementFilialeService.postCompresseurSecheurFiliale().subscribe(
        res => {
          if (res == "Added done") {
            this.equipementFilialeService.initializeAddOrUpdateCompresseurSecheurFilialeForAdd();
            this.matDialog.closeAll();
            this.ngOnInit();
            this._snackBar.open("L'ajout a été effectuée avec succès", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["green-snackbar"]
            });
          }
          else if (res == "Nom Existant") {
            this._snackBar.open("Le 'Nom' existe déjà", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            });
          }
          else if (res == "NumSerie Existant") {
            this._snackBar.open("Le 'N° de Série' existe déjà", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            });
          }
          else if (res == "Nom et NumSerie Existants") {
            this._snackBar.open("Le 'Nom' et le 'N° de Série' existent déjà", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            });
          }
          else if (res == "Date d'acquisition invalide") {
            this._snackBar.open("La 'Date d'acquisition' est invalide", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
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
    else {
      this._snackBar.open("Le 'Prix d'acquisition' doit être strictement supérieur à 0", "X", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    }
  }

  updateRecord() {
    if (this.equipementFilialeService.AddOrUpdateCompresseurSecheurFiliale.controls.prixAcquisition.value > 0) {
      this.equipementFilialeService.putCompresseurSecheurFiliale().subscribe(
        res => {
          if (res == "Update Done") {
            this.equipementFilialeService.initializeAddOrUpdateCompresseurSecheurFilialeForAdd();
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
          else if (res == "Nom Existant") {
            this._snackBar.open("Le 'Nom' existe déjà", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            });
          }
          else if (res == "NumSerie Existant") {
            this._snackBar.open("Le 'N° de Série' existe déjà", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            });
          }
          else if (res == "Nom et NumSerie Existants") {
            this._snackBar.open("Le 'Nom' et le 'N° de Série' existent déjà", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
            });
          }
          else if (res == "Date d'acquisition invalide") {
            this._snackBar.open("La 'Date d'acquisition' est invalide", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["red-snackbar"]
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
    else {
      this._snackBar.open("Le 'Prix d'acquisition' doit être strictement supérieur à 0", "X", {
        duration: 4000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["red-snackbar"]
      });
    }
  }
}
