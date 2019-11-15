import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/Shared/Gestion_Compresseur/GRHs/data.service";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { GRHs } from "src/app/Shared/Gestion_Compresseur/GRHs/grhs.model";
import { GRHsPostUpdateComponent } from "../grhs-post-update/grhs-post-update.component";
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';

@Component({
  selector: "app-grhs-get-delete",
  templateUrl: "./grhs-get-delete.component.html",
  styleUrls: []
})
export class GRHsGetDeleteComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, public data: DataService, public dialog: MatDialog, private fb: FormBuilder, private authService: AuthenticationService, private datafiliale: DataFilialeService, private authenticationService: AuthenticationService) { }

  listF: Filiale[] = new Array();
  listCF: EquipementFiliale[] = new Array();
  filialeId = '';
  userRole = '';
  GRHSearchForm = this.fb.group({
    filiale: ["",],
    date: ["",]
  });
  GRHSearchForm1 = this.fb.group({
    filiale: ["",]
  });
  //pagination variables
  p: number = 1;
  selectFiliale() {

    this.data
      .getlistCF()
      .subscribe(res => {
        this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true);
        //.filter(x => x.active == true && x.filialeID == this.filialeId)
        this.data
          .getGRhs()
          .toPromise()
          .then(res => {
            this.data.list = res as GRHs[];
            if (this.GRHSearchForm1.controls.filiale.value != 0) {
              this.data.list = this.data.list.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.GRHSearchForm1.controls.filiale.value);
            }
          });
      });

  }
  ngOnInit() {

    this.datafiliale.getFiliale().subscribe(res => {
      this.datafiliale.list = res as Filiale[]

      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.Role_Utilisateur) {
        this.userRole = currentUser.Role_Utilisateur;
        this.filialeId = currentUser.Filiale_Utilisateur;

        this.data
          .getlistCF()
          .subscribe(res => {
            this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true);

            //.filter(x => x.active == true && x.filialeID == this.filialeId)
            this.data
              .getGRhs()
              .toPromise()
              .then(res => {
                this.data.list = res as GRHs[];
                if (this.userRole == 'Responsable') {
                  this.data.list = this.data.list.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.filialeId);
                }
                console.log(this.data.list);
              });
          });



      }



    });

  }



  edit(grhs: GRHs) { }

  onEdit(grhs: GRHs) {
    this.data.initializeFormGroupForEdit(grhs);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    // dialogConfig.height = "90%";
    this.dialog.open(GRHsPostUpdateComponent, dialogConfig);
  }
  delete(gRhID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.data.DeleteGRhs(gRhID).subscribe(
        res => {
          this.ngOnInit();
          if (res == "Delete Done") {
            this.dialog.closeAll()
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
    // dialogConfig.height = "100%";
    this.dialog.open(GRHsPostUpdateComponent, dialogConfig);
  }


  GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
    return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID).nom;
  }


  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
    return this.datafiliale.list.find(x => x.filialeID == a);
  }

}