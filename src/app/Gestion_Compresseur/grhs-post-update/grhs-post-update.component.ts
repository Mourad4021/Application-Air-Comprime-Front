import { Filiale } from 'src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model';
import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/Shared/Gestion_Compresseur/GRHs/data.service";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { DataFilialeService } from 'src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { GRHs } from 'src/app/Shared/Gestion_Compresseur/GRHs/grhs.model';
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { EntretienReservoirService } from 'src/app/Shared/Gestion_Compresseur/Entretien-Reservoir/entretien-reservoir.service';

@Component({
  selector: "app-grhs-post-update",
  templateUrl: "./grhs-post-update.component.html",
  styleUrls: []
})
export class GRHsPostUpdateComponent implements OnInit {
  DateToday: Date
  constructor(
    private _snackBar: MatSnackBar,
    public data: DataService,
    public dialogRef: MatDialogRef<GRHsPostUpdateComponent>,
    private authenticationService: AuthenticationService,
    private datafiliale: DataFilialeService,
    private Service: EntretienReservoirService
  ) { }
  listCF: EquipementFiliale[];
  filialeId = '';
  userRole = '';
  // ngOnInit() {

  //   this.Service.getDate().subscribe(
  //     res => {
  //       this.DateToday = res as Date
  //     }
  //   )



  //   this.datafiliale.getFiliale().subscribe(res => {
  //     this.datafiliale.list = res as Filiale[]
  //     let currentUser = this.authenticationService.currentUserValue;
  //     if (currentUser && currentUser.Role_Utilisateur) {
  //       this.userRole = currentUser.Role_Utilisateur;
  //       this.filialeId = currentUser.Filiale_Utilisateur;

  //       this.data
  //         .getlistCF()
  //         .subscribe(res => {
  //           this.listCF = (res as EquipementFiliale[]).filter(x => x.active == true)
  //           if (this.userRole == 'Responsable') {
  //             this.listCF = this.listCF.filter(x => x.filialeID == this.filialeId);
  //           }
  //           //.filter(x => x.active == true && x.filialeID == this.filialeId)

  //         });
  //     }


  //   });
  // }
  ngOnInit() {
    this.Service.getDate().subscribe(
      res => {
        this.DateToday = res as Date;
      }
    );

    this.datafiliale.getFiliale().subscribe(res => {
      this.datafiliale.list = (res as Filiale[]).filter(x => x.active == true);

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

                  this.listCF = this.listCF.filter(x => x.filialeID == this.filialeId);

                }

              });
          });



      }



    });

  }

  refrechGRHList() {

    this.data
      .getGRhs()
      .subscribe(
        res => {
          this.data.list = res as GRHs[];
          let currentUser = this.authenticationService.currentUserValue;
          if (currentUser && currentUser.Role_Utilisateur) {
            this.userRole = currentUser.Role_Utilisateur;
            this.filialeId = currentUser.Filiale_Utilisateur;
          }
          debugger
          if (this.userRole == 'Responsable') {
            this.data.list = this.data.list.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.filialeId);
          }
        });

  }


  onClear() {
    this.data.form.reset();
    // this.data.initializeFormGroup();
    if (this.data.form.controls.gRhID.value ==
      "00000000-0000-0000-0000-000000000000") {
      this.data.initializeFormGroup();
      /////
    }
  }

  onSubmit() {
    if (
      this.data.form.controls.gRhID.value ==
      "00000000-0000-0000-0000-000000000000"
    ) {
      this.insertRecord();
    } else {
      this.updateRecord();
    }
  }

  insertRecord() {
    debugger
    this.Service.getDate().subscribe(
      res => {
        this.DateToday = res as Date
      }
    )
    if (this.data.form.controls.date.value <= this.DateToday) {
      this.data.insertGRhs().subscribe(
        res => {
          if (res == "Added done") {
            this.resetForm();
            this.dialogRef.close();
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
    else (this._snackBar.open("La date doit être inférieur ou égal à la date actuelle ", "X", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["red-snackbar"]
    })
    )
  }

  updateRecord() {
    this.Service.getDate().subscribe(
      res => {
        this.DateToday = res as Date
      }
    )
    if (this.data.form.controls.date.value <= this.DateToday) {
      this.data.putGRhs().subscribe(
        res => {
          if (res == "Update Done") {
            this.resetForm();
            this.dialogRef.close();
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
    else (this._snackBar.open("La date doit être inférieur ou égal à la date actuelle ", "X", {
      duration: 4000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: ["red-snackbar"]
    })
    )
  }


  resetForm() {
    this.data.grhs = {
      gRhID: "",
      equipementFilialeID: "",
      //filiale: "",
      salaire: 0,
      // charge_Compresseur: 0,
      // charge_Secteur: 0,
      // charge_Total: 0,
      // compresseur_Pourcentage: 0,
      tauxAffectationAirComprime: 0,
      date: new Date(),
      chargesMensuelles: 0
    };
  }
  onClose() {
    this.dialogRef.close();
  }

  GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
    return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID).nom;
  }


  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    debugger
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
    return this.datafiliale.list.find(x => x.filialeID == a);
  }


}