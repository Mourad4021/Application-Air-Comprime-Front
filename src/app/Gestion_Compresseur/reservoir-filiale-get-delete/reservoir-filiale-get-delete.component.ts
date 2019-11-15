import { Component, OnInit } from '@angular/core';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { FormBuilder } from '@angular/forms';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { ReservoirFilialePostUpdateComponent } from '../reservoir-filiale-post-update/reservoir-filiale-post-update.component';
import { ReservoirFilialeService } from 'src/app/Shared/Gestion_Compresseur/Reservoir-Filiale/reservoir-filiale.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reservoir-filiale-get-delete',
  templateUrl: './reservoir-filiale-get-delete.component.html',
  styles: []
})
export class ReservoirFilialeGetDeleteComponent implements OnInit {

  constructor(

    private equipementDataService: EquipementDataService,
    private reservoirFilialeService: ReservoirFilialeService,
    private dataFilialeService: DataFilialeService,
    public dialog: MatDialog,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient
  ) { }
  ReservoirFilialeSearchForm = this.fb.group({
    nom: [''],
    filialeID: [""]

  });
  //pagination variables
  p: number = 1;
  activeReservoirList: Equipement[];
  FilialeList: Filiale[];
  listActiveEquipementFiliale: EquipementFiliale[];
  ListEquipementFiliale: EquipementFiliale[];

  ngOnInit() {
    this.dataFilialeService.getFiliale().subscribe(
      (res: any) => {
        this.FilialeList = (res as Filiale[]).filter(x => x.active == true)

        this.equipementDataService.getactiveReservoirList().subscribe(
          (res2: any) => {
            this.equipementDataService.listActiveReservoir = res2 as Equipement[]

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


      });
  }
  onCreateEquipementFiliale() {
    this.reservoirFilialeService.initializeAddOrUpdateReservoirFilialeFormForAdd();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(ReservoirFilialePostUpdateComponent, dialogConfig);
  }
  GetFilialeNameByIDCorrespondance(FilialeId: string) {

    return this.FilialeList.find(
      f => f.filialeID == FilialeId
    );
  }

  GetReservoirByIDCorrespondance(EquipementID: string) {



    return this.equipementDataService.listActiveReservoir.find(f => f.equipementID == EquipementID);
  }
  putReservoirFilialeForFakeDelete(equipementFilialeID) {
    // this.reservoirDataService.getactiveReservoirFilialeList().subscribe(
    //   res => {
    //     this.listActiveEquipementFiliale = res as EquipementFiliale[]
    //   });
    let ReservoirFiliale = this.reservoirFilialeService.listActiveEquipementFiliale.find(x => x.equipementFilialeID == equipementFilialeID)
    ReservoirFiliale.active = false;
    return this.httpClient.put(environment.gestionCompresseursApi + '/EquipementFiliales/' + equipementFilialeID, ReservoirFiliale, { responseType: 'text' })
  }
  onDelete(equipementFilialeID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.putReservoirFilialeForFakeDelete(equipementFilialeID).subscribe(
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
  onGetEquipementFilialeList() {
    this.reservoirFilialeService.getReservoirFilialeList().subscribe(
      res => {
        this.reservoirFilialeService.ListEquipementFiliale = res as EquipementFiliale[];
      },
      () => { }
    );
  }

  onEdit(equipementFiliale: EquipementFiliale) {
    this.reservoirFilialeService.initializeAddOrUpdateReservoirFilialeFormForEdit(
      equipementFiliale
    );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(ReservoirFilialePostUpdateComponent, dialogConfig);
  }

  getactiveEquipementFiliale() {

    this.reservoirFilialeService.getReservoirFilialeList().subscribe(
      res => {

        this.ListEquipementFiliale = res as EquipementFiliale[]
      },
      err => { },
      () => {

        this.ListEquipementFiliale.forEach(element => {
          if (element.active == true) {
            this.listActiveEquipementFiliale.push(element);
          }
        });
      })
  }

}
