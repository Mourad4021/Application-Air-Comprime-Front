import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { ReservoirFilialeService } from 'src/app/Shared/Gestion_Compresseur/Reservoir-Filiale/reservoir-filiale.service';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { ReservoirFilialeGetDeleteComponent } from '../reservoir-filiale-get-delete/reservoir-filiale-get-delete.component';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';


@Component({
  selector: 'app-reservoir-filiale-post-update',
  templateUrl: './reservoir-filiale-post-update.component.html',
  styles: []
})
export class ReservoirFilialePostUpdateComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private reservoirFilialeService: ReservoirFilialeService,
    private equipementDataService: EquipementDataService,
    private dataFilialeService: DataFilialeService,
    private authService: AuthenticationService,
    private matDialog: MatDialog

  ) { }
  listFiliale: Filiale[] = new Array;


  ngOnInit() {
    if (this.authService.currentUserRole == "Responsable") {
      this.dataFilialeService.getFiliale().subscribe(
        res => {
          this.dataFilialeService.listActive = (res as Filiale[]).filter(x => x.active == true).filter(x => x.filialeID == this.authService.getcurrentUserFiliale())
        });
    }
    else {
      this.dataFilialeService.getFiliale().subscribe(
        res => {
          this.dataFilialeService.listActive = (res as Filiale[]).filter(x => x.active == true)
        });
    }

    this.equipementDataService.getactiveReservoirList().subscribe(
      res => {
        this.equipementDataService.listActiveReservoir = res as Equipement[]

        if (this.authService.currentUserRole == "Responsable") {
          this.reservoirFilialeService.getactiveReservoirFilialeList().subscribe(
            (res3: any) => {

              this.reservoirFilialeService.listActiveEquipementFiliale = (res3 as EquipementFiliale[])
                .filter(x => x.filialeID == this.authService.getcurrentUserFiliale())

            });
        }
        else {
          this.reservoirFilialeService.getactiveReservoirFilialeList().subscribe(
            (res3: any) => {

              this.reservoirFilialeService.listActiveEquipementFiliale = res3 as EquipementFiliale[]
            });
        }
      });



  }


  onClose() {
    this.matDialog.closeAll();
  }

  onClear() {
    this.reservoirFilialeService.initializeAddOrUpdateReservoirFilialeFormForAdd();
  }
  onSubmit() {
    if (
      this.reservoirFilialeService.AddOrUpdateReservoirFilialeForm.controls.equipementFilialeID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }
  insertRecord() {
    this.reservoirFilialeService.postReservoirFiliale().subscribe(
      res => {
        if (res == "Added done") {
          this.reservoirFilialeService.initializeAddOrUpdateReservoirFilialeFormForAdd();
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
    this.reservoirFilialeService.putReservoirFiliale().subscribe(
      res => {
        if (res == "Update Done") {
          this.reservoirFilialeService.initializeAddOrUpdateReservoirFilialeFormForAdd();
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

  GetReservoirByIDCorrespondance(EquipementID: string) {


    return this.equipementDataService.listActiveReservoir.find(f => f.equipementID == EquipementID);
  }

  getactiveReservoirFiliale() {
    this.reservoirFilialeService.ListEquipementFiliale = new Array()
    this.reservoirFilialeService.listActiveEquipementFiliale = new Array()
    this.reservoirFilialeService.getReservoirFilialeList().subscribe(
      res => {
        this.reservoirFilialeService.ListEquipementFiliale = res as EquipementFiliale[]
      },
      err => { },
      () => {

        this.reservoirFilialeService.ListEquipementFiliale.forEach(element => {
          if (element.active == true) {
            this.reservoirFilialeService.listActiveEquipementFiliale.push(element);
          }
        });
      })


  }
}
