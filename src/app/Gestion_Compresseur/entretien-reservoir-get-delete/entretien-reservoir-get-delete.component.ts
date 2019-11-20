import { Component, OnInit } from '@angular/core';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
//import { EntretienReservoir } from 'src/app/Shared/Gestion_Compresseur/Entretien_Reservoir/entretien-reservoir.model';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { EntretienReservoirPostUpdateComponent } from '../entretien-reservoir-post-update/entretien-reservoir-post-update.component';
import { EntretienReservoirService } from 'src/app/Shared/Gestion_Compresseur/Entretien-Reservoir/entretien-reservoir.service';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { EntretienReservoir } from 'src/app/Shared/Gestion_Compresseur/Entretien-Reservoir/entretien-reservoir.model';

@Component({
  selector: 'app-entretien-reservoir-get-delete',
  templateUrl: './entretien-reservoir-get-delete.component.html',
  styles: []
})
export class EntretienReservoirGetDeleteComponent implements OnInit {

  constructor(public data: EntretienReservoirService,
    private fb: FormBuilder,
    private datafiliale: DataFilialeService,
    private DataFicheCompresseur: EquipementDataService,
    private _snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    public dataCF: EquipementFilialeService,
    private dialog: MatDialog) { }

  listCF: EquipementFiliale[];
  ListFicheCompresseur: Equipement[] = new Array();
  filialeId: string;
  userRole: string;
  NatureDeVisite: any[] = ["Interieure", "Exterieure", "Officielle"];
  DateToday: Date;
  EntretienReservoirSearchFormFiliale = this.fb.group({
    filiale: [""],
  });
  EntretienReservoirSearchFormnatureVisite = this.fb.group({
    natureVisite: [""],
  });
  EntretienReservoirSearchForm = this.fb.group({
    filialeID: [""],
    equipementFilialeID: [""],
    natureVisite: [""],
    derniereVisite: [""],
    prochaineVisite: [""]
  });

  p: number = 1;

  ngOnInit() {

    this.data.getDate().subscribe(
      res => {
        this.DateToday = res as Date
      }
    )

    this.data.getEntretienReservoir().subscribe(
      res => {
        this.data.list = res as EntretienReservoir[]
      });

    this.datafiliale.getFiliale().subscribe(res => { this.datafiliale.list = res as Filiale[] });
    this.DataFicheCompresseur.getReservoirList().subscribe(res => { this.DataFicheCompresseur.listActiveReservoir = res as Equipement[] });
    this.datafiliale.getFiliale().subscribe(res => {
      this.datafiliale.list = res as Filiale[]

      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.Role_Utilisateur) {
        this.userRole = currentUser.Role_Utilisateur;
        this.filialeId = currentUser.Filiale_Utilisateur;

        this.dataCF
          .getactiveEquipementFilialeList()
          .subscribe(res => {
            this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true);
            //.filter(x => x.active == true && x.filialeID == this.filialeId)
            this.data
              .getEntretienReservoir()
              .toPromise()
              .then(res => {
                this.data.list = res as EntretienReservoir[];
                if (this.userRole == 'Responsable') {
                  this.data.list = this.data.list.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.filialeId);
                }
              });
          });
      }

    });
  }


  selectFiliale() {

    this.dataCF
      .getactiveEquipementFilialeList()
      .subscribe(res => {
        this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true);
        //.filter(x => x.active == true && x.filialeID == this.filialeId)
        this.data
          .getEntretienReservoir()
          .toPromise()
          .then(res => {
            this.data.list = res as EntretienReservoir[];
            if (this.EntretienReservoirSearchFormFiliale.controls.filiale.value != 0) {
              this.data.list = this.data.list.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.EntretienReservoirSearchFormFiliale.controls.filiale.value);
            }
          });
      });
  }

  selectnature() {
    this.data.getEntretienReservoir()
      .toPromise()
      .then(res => {
        this.data.list = res as EntretienReservoir[]

        if (this.EntretienReservoirSearchFormnatureVisite.controls.natureVisite.value == 'Interieure')
          this.data.list = this.data.list.filter(x => x.natureVisite == '0')
        else if (this.EntretienReservoirSearchFormnatureVisite.controls.natureVisite.value == 'Exterieure')
          this.data.list = this.data.list.filter(x => x.natureVisite == '1')
        else if (this.EntretienReservoirSearchFormnatureVisite.controls.natureVisite.value == 'Officielle')
          this.data.list = this.data.list.filter(x => x.natureVisite == '2')
      })
  }

  delete(entretienReservoirID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.data.DeleteEntretienReservoir(entretienReservoirID).subscribe(
        res => {
          console.log(res)
          if (res == "Delete Done") {
            console.log(res)
            this.ngOnInit();
            this._snackBar.open("La suppression a été effectuée avec succès", "X", {
              duration: 4000,
              verticalPosition: "top",
              horizontalPosition: "center",
              panelClass: ["green-snackbar"]
            });
          }
        },
        err => {
          console.log(err)
          this.ngOnInit();
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

  onCreateEntretienCompresseur() {
    this.data.initializeAddOrUpdateEntretienReservoirFormForAdd();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(EntretienReservoirPostUpdateComponent, dialogConfig);
  }
  onEditEntretienCompresseur(entretienReservoir: EntretienReservoir) {
    this.data.initializeAddOrUpdateEntretienReservoirFormForEdit(entretienReservoir);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(EntretienReservoirPostUpdateComponent, dialogConfig);
  }

  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
    return this.datafiliale.list.find(x => x.filialeID == a);
  }
  GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
    return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID);
  }

  GetEquipementByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).equipementID;
    return this.DataFicheCompresseur.listActiveReservoir.find(x => x.equipementID == a);
  }
}


