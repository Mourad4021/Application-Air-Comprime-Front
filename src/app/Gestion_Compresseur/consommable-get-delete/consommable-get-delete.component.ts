import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/Shared/Gestion_Compresseur/Consommable/data.service";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { Consommable } from "src/app/Shared/Gestion_Compresseur/Consommable/consommable.model";
import { ConsommablePostUpdateComponent } from "../consommable-post-update/consommable-post-update.component";
import { FormBuilder } from '@angular/forms';
//import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Compresseur_Filiale/EquipementFiliale.model';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
//import { dataEquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Compresseur_Filiale/dataEquipementFiliale.service';
import { EquipementFilialeService } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.service';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { EquipementDataService } from 'src/app/Shared/Gestion_Compresseur/Gestion_Equipements/data.service';

@Component({
  selector: "app-consommable-get-delete",
  templateUrl: "./consommable-get-delete.component.html",
  styleUrls: []
})
export class ConsommableGetDeleteComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, public data: DataService, public datafiliale: DataFilialeService, private equipementDataService: EquipementDataService,
    public dialog: MatDialog, private equipementFilialeService: EquipementFilialeService, private fb: FormBuilder, private authService: AuthenticationService) { }
  ConsommableSearchForm = this.fb.group({
    prixUnitaire: [""],
    //equipementFilialeID: [""],
    nom: [""],
    date: ["",]
  });
  FilialeearchForm = this.fb.group({
    filiale: ["",]
  });
  //pagination variables
  p: number = 1;
  listF: Filiale[];
  listCF: EquipementFiliale[];

  selectFiliale() {

    this.data
      .getlistCF()
      .subscribe(res => {
        this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true);
        //.filter(x => x.active == true && x.filialeID == this.filialeId)
        this.data
          .getConsommable().toPromise()
          .then(res => {
            this.data.list = res as Consommable[];

            if (this.FilialeearchForm.controls.filiale.value != 0) {
              this.data.list = this.data.list.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.FilialeearchForm.controls.filiale.value);
            }
          });
      })
  }



  //pagination variables



  // this.datafiliale.getFiliale().subscribe(
  //   res => {
  //     this.datafiliale.list = res as Filiale[] }  

  //     );
  // this.dataEquipementFilialeService.getEquipementFiliale().subscribe(
  //   res => {
  //     this.dataEquipementFilialeService.list = res as EquipementFiliale[]
  //   }
  // );
  // this.data.getConsommable().toPromise()
  //   .then(res => {
  //     this.data.list = res as Consommable[];
  //   });
  // this.data
  //   .getlistCF()
  //   .toPromise()
  //   .then(res => (this.listCF = res as EquipementFiliale[]));
  // this.datafiliale.getFiliale();
  userRole: 'Responsable';
  filialeId: '';
  ngOnInit() {

    this.datafiliale.getFiliale().subscribe(res => {
      this.datafiliale.list = res as Filiale[]

      let currentUser = this.authService.currentUserValue;
      if (currentUser && currentUser.Role_Utilisateur) {
        this.userRole = currentUser.Role_Utilisateur;
        this.filialeId = currentUser.Filiale_Utilisateur;

        this.data
          .getlistCF()
          .subscribe(res => {
            this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true);
            //.filter(x => x.active == true && x.filialeID == this.filialeId)
            this.data
              .getConsommable()
              .toPromise()
              .then(res => {
                this.data.list = res as Consommable[];
                if (this.userRole == "Responsable") {
                  this.data.list = this.data.list.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.filialeId);
                }
              });
          });
      }
    });
  }

  edit(consommable: Consommable) { }

  onEdit(consommable: Consommable) {
    this.data.initializeFormGroupForEdit(consommable);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    // dialogConfig.height = "90%";
    this.dialog.open(ConsommablePostUpdateComponent, dialogConfig);
  }
  delete(consommableID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.data.DeleteConsommable(consommableID).subscribe(
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
  onCreate() {
    this.data.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    //dialogConfig.height = "100%";
    this.dialog.open(ConsommablePostUpdateComponent, dialogConfig);
  }


  GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
    return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID).nom;

  }
  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
    return this.datafiliale.list.find(x => x.filialeID == a);
  }
}

