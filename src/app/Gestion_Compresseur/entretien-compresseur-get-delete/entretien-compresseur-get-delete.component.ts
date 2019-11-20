import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { Fournisseur } from 'src/app/Shared/Gestion Fournisseur/Fournisseur.model';
import { EntretienCompresseurService } from 'src/app/Shared/Gestion_Compresseur/Entretien-Compresseur/entretien-compresseur.service';
import { EntretienCompresseur } from 'src/app/Shared/Gestion_Compresseur/Entretien-Compresseur/entretien-compresseur.model';
import { EntretienCompresseurPostUpdateComponent } from '../entretien-compresseur-post-update/entretien-compresseur-post-update.component';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { Equipement } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/Equipement.model';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { GestionFournisseurDataService } from 'src/app/Shared/Gestion Fournisseur/datafournisseur.service';


@Component({
  selector: 'app-entretien-compresseur-get-delete',
  templateUrl: './entretien-compresseur-get-delete.component.html',
  styles: []
})
export class EntretienCompresseurGetDeleteComponent implements OnInit {

  constructor(public data: EntretienCompresseurService,
    private fb: FormBuilder,
    public datafiliale: DataFilialeService,
    public dataFicheCompresseur: EquipementDataService,
    public dataCF: EquipementFilialeService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authenticationService: AuthenticationService,
    public DataFournisseur: GestionFournisseurDataService) { }

  listCF: EquipementFiliale[]
  ListF: Filiale[] = new Array();
  ListFC: Equipement[] = new Array();
  filialeId: string;
  userRole: string;
  ListFournisseur: Fournisseur[];
  EntretienCompresseurSearchFormFiliale = this.fb.group({


    filiale: [""],
  });
  EntretienCompresseurSearchForm = this.fb.group({


    filialeID: [""],
    equipementFilialeID: [""],
    typeEntretien: [""],
    valeurCompteurProchainEntretien: [""]
  });

  p: number = 1;
  ngOnInit() {
    this.data.getEntretienCompresseur().subscribe(
      res => {
        this.data.list = res as EntretienCompresseur[]
      });


    this.DataFournisseur.getFournisseur().subscribe(
      res => (this.ListFournisseur = res as Fournisseur[])
    )

    this.datafiliale.getFiliale().subscribe(res => { this.datafiliale.list = res as Filiale[] });
    this.dataFicheCompresseur.getCompresseurList().subscribe(res => { this.dataFicheCompresseur.ListEquipement = res as Equipement[] });
    this.datafiliale.getFiliale().subscribe(res => {
      this.datafiliale.list = res as Filiale[]

      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.Role_Utilisateur) {
        this.userRole = currentUser.Role_Utilisateur;
        this.filialeId = currentUser.Filiale_Utilisateur;

        this.dataCF.getactiveEquipementFilialeList()
          // .getEquipementFilialeList()
          .subscribe(res => {
            this.listCF = (res as EquipementFiliale[])
            //.filter(x => x.active == true && x.filialeID == this.filialeId)
            this.data
              .getEntretienCompresseur()
              .toPromise()
              .then(res => {
                this.data.list = res as EntretienCompresseur[];
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
          .getEntretienCompresseur()
          .toPromise()
          .then(res => {
            this.data.list = res as EntretienCompresseur[];
            if (this.EntretienCompresseurSearchFormFiliale.controls.filiale.value != 0) {
              this.data.list = this.data.list.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.EntretienCompresseurSearchFormFiliale.controls.filiale.value);
            }
          });
      });
  }

  delete(entretienCompresseurID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.data.DeleteEntretienCompresseur(entretienCompresseurID).subscribe(
        res => {

          if (res == "Delete Done") {

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
    this.data.initializeAddOrUpdateEntretienCompresseurFormForAdd();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(EntretienCompresseurPostUpdateComponent, dialogConfig);
  }

  onEditEntretienCompresseur(entretienCompresseur: EntretienCompresseur) {
    this.data.initializeAddOrUpdateEntretienCompresseurFormForEdit(entretienCompresseur);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(EntretienCompresseurPostUpdateComponent, dialogConfig);
  }
  GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
    return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID);
  }
  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;

    return this.datafiliale.list.find(x => x.filialeID == a);
  }
  GetPuissanceByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).equipementID;
    return this.dataFicheCompresseur.ListEquipement.find(x => x.equipementID == a).puissance;
  }



  GetFrequenceEntretienByIDCorrespondance(equipementFilialeID: string) {
    let IDFicheCompresseur = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).equipementID;
    let IDfournisseur = this.dataFicheCompresseur.ListEquipement.find(Fc => Fc.equipementID == IDFicheCompresseur).fournisseurID;
    return this.ListFournisseur.find(x => x.fournisseurID == IDfournisseur).frequence_Des_Entretiens_Compresseur;
  }

}
