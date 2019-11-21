import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { DataService } from 'src/app/Shared/Gestion_Compresseur/Consommable/data.service';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { ConsommablePostUpdateComponent } from '../consommable-post-update/consommable-post-update.component';
import { Consommable } from 'src/app/Shared/Gestion_Compresseur/Consommable/consommable.model';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';

@Component({
  selector: "app-consommable-get-delete",
  templateUrl: "./consommable-get-delete.component.html",
  styleUrls: []
})
export class ConsommableGetDeleteComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar,
    public consommableService: DataService,
    public filialeService: DataFilialeService,
    public dialog: MatDialog,
    private equipementFilialeService: EquipementFilialeService,
    private fb: FormBuilder,
    private authService: AuthenticationService) { }



  ConsommableSearchForm = this.fb.group({
    prixUnitaire: [""],
    date: ["",]

  });
  ConsommableSearchFormFiliale = this.fb.group({
    filiale: ["",]
  });
  //pagination variables
  p: number = 1;
  filialeId: '';

  selectFiliale() {

    this.filialeService.getActiveFiliale().subscribe(
      res => {
        this.filialeService.listActive = res as Filiale[]

        this.consommableService.getActiveCompresseursFiliales().subscribe(
          res => {
            this.consommableService.ActiveCompresseurFiliale = res as EquipementFiliale[]

            this.consommableService.getactiveConsommable().subscribe(
              res => {

              })

          })


      })


  }
  ngOnInit() {


    this.filialeService.getActiveFiliale().subscribe(
      res => {
        this.filialeService.listActive = res as Filiale[]

        this.consommableService.getActiveCompresseursFiliales().subscribe(
          res => {
            this.consommableService.ActiveCompresseurFiliale = res as EquipementFiliale[]

            this.consommableService.getactiveConsommable().subscribe
              (
                res => {

                  this.consommableService.ActiveConsommable = res as Consommable[]

                })
          })
      })

  }


  onCreateConsommable() {
    this.consommableService.initializeAddOrUpdateConsommableFormForAdd();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(ConsommablePostUpdateComponent, dialogConfig);
  }

  GetCompresseurFilialeByIDCorrespondance(EquipementFilialeID: string) {
    return this.consommableService.ActiveCompresseurFiliale.find(f => f.equipementFilialeID == EquipementFilialeID);
  }



  onDelete(ConsommableID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.consommableService.putConsommableForFakeDelete(ConsommableID).subscribe(
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



  onEdit(consommable: Consommable) {
    this.consommableService.initializeAddOrUpdateConsommableFormForEdit(
      consommable
    );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    this.dialog.open(ConsommablePostUpdateComponent, dialogConfig);
  }

  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.consommableService.ActiveCompresseurFiliale.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
    return this.filialeService.listActive.find(x => x.filialeID == a);
  }

}

