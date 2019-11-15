// import { Component, OnInit } from "@angular/core";
// import { DataService } from "src/app/Shared/Gestion_Compresseur/Fiche_Suivi/data.service";
// import { MatDialog, MatDialogConfig } from "@angular/material";
// import { FicheSuivi } from "src/app/Shared/Gestion_Compresseur/Fiche_Suivi/fiche-suivi.model";
// import { FicheSuiviPostUpdateComponent } from "../fiche-suivi-post-update/fiche-suivi-post-update.component";
// import { DataFilialeService } from "src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service";
// import { Filiale } from "src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model";
// import { FormBuilder } from "@angular/forms";
// import { AuthenticationService } from "src/app/Shared/AuthenticationService/authentication.service";
// import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';

// @Component({
//   selector: "app-fiche-suivi-get-delete",
//   templateUrl: "./fiche-suivi-get-delete.component.html",
//   styleUrls: []
// })
// export class FicheSuiviGetDeleteComponent implements OnInit {
//   constructor(
//     public data: DataService,
//     public dialog: MatDialog,
//     public datafiliale: DataFilialeService,
//     private fb: FormBuilder,
//     private authService: AuthenticationService
//   ) { }
//   etatList: any[] = ["En_marche", "En_panne", "Reserve"];
//   FicheSuiviSearchForm = this.fb.group({
//     date: [""]
//   });
//   //pagination variables
//   p: number = 1;

//   listF: Filiale[];
//   listCF: EquipementFiliale[];
//   ngOnInit() {
//     this.datafiliale.getFiliale().subscribe(
//       res => {
//         this.datafiliale.list = res as Filiale[]
//         this.data
//           .getlistCF()
//           .toPromise()
//           .then(res => {
//             (
//               this.listCF = res as EquipementFiliale[])
//             this.data.getFicheSuivi().toPromise()
//               .then(res => {
//                 if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
//                   this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
//                 }
//                 else {
//                   this.data.list = res as FicheSuivi[]
//                 }

//                 console.log(this.data.list);

//               });
//           });
//       }
//     )




//   }
//   edit(ficheSuivi: FicheSuivi) { }

//   onEdit(ficheSuivi: FicheSuivi) {

//     this.data.initializeFormGroupForEdit(ficheSuivi);
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.disableClose = true;
//     dialogConfig.autoFocus = false;
//     dialogConfig.width = "70%";
//     //dialogConfig.height = "100%";
//     this.dialog.open(FicheSuiviPostUpdateComponent, dialogConfig);
//   }
//   delete(ficheSuiviID) {
//     if (confirm("Vous êtes sûr de vouloir supprimer")) {
//       this.data.DeleteFicheSuivi(ficheSuiviID).subscribe(
//         res => {
//           console.log(res);
//           this.ngOnInit();
//         },
//         err => {
//           console.log(err);
//           this.ngOnInit();
//         }
//       );
//     }
//   }
//   onCreate() {
//     this.data.initializeFormGroup();
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.disableClose = true;
//     dialogConfig.autoFocus = false;
//     dialogConfig.width = "70%";
//     //dialogConfig.height = "90%";
//     this.dialog.open(FicheSuiviPostUpdateComponent, dialogConfig);
//   }

//   GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
//     return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID);
//   }

//   GetFilialeByIDCorrespondance(equipementFilialeID: string) {
//     let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
//     return this.datafiliale.list.find(x => x.filialeID == a);
//   }
// }



import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/Shared/Gestion_Compresseur/Fiche_Suivi/data.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FicheSuivi } from "src/app/Shared/Gestion_Compresseur/Fiche_Suivi/fiche-suivi.model";
import { FicheSuiviPostUpdateComponent } from "../fiche-suivi-post-update/fiche-suivi-post-update.component";
import { DataFilialeService } from "src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service";
import { Filiale } from "src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "src/app/Shared/AuthenticationService/authentication.service";
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';
import { FicheSuiviComponent } from '../fiche-suivi/fiche-suivi.component';


@Component({
  selector: "app-fiche-suivi-get-delete",
  templateUrl: "./fiche-suivi-get-delete.component.html",
  styleUrls: []
})
export class FicheSuiviGetDeleteComponent implements OnInit {
  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public datafiliale: DataFilialeService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }
  etatList: any[] = ["En_marche", "En_panne", "Reserve"];

  FicheSuiviSearchForm = this.fb.group({
    filiale: ["",]
  });

  selectFiliale() {



    this.data
      .getlistCF()
      .toPromise()
      .then(res => {

        if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
          this.listCF = (res as EquipementFiliale[]).filter(x => x.filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
        }
        else {
          this.listCF = res as EquipementFiliale[];
          if (this.FicheSuiviSearchForm.controls.filiale.value != 0) {
            this.listCF = this.listCF.filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.FicheSuiviSearchForm.controls.filiale.value);
          }
        }
      });

    return this.listCF;

  }


  //pagination variables
  p: number = 1;
  list: FicheSuivi[]
  listF: Filiale[];
  listCF: EquipementFiliale[];

  //listsomme: FicheSuivi[];


  formSomme: FormGroup = new FormGroup({
    ficheSuiviID: new FormControl(""),
    equipementFilialeID: new FormControl(""),
    date: new FormControl(""),
    nbre_Heurs_Total: new FormControl(""),
    nbre_Heurs_Charge: new FormControl(""),
    index_Electrique: new FormControl(""),
    tempsArret: new FormControl(""),
    etat: new FormControl(""),
    frequenceEentretienDeshuileur: new FormControl(""),
    courantAbsorbePhase: new FormControl(""),
    fraisEntretienReparation: new FormControl(""),
    priseCompteur: new FormControl(""),
    files: new FormControl(""),
    tHuileC: new FormControl(0),
    tSecheurC: new FormControl(""),
    remarques: new FormControl("")
  });

  initializeFormSomme() {
    this.formSomme.setValue({
      ficheSuiviID: "00000000-0000-0000-0000-000000000000",
      equipementFilialeID: "00000000-0000-0000-0000-000000000000",
      date: "",
      nbre_Heurs_Total: 0,
      nbre_Heurs_Charge: 0,
      index_Electrique: 0,
      tempsArret: 0,
      etat: "",
      frequenceEentretienDeshuileur: 0,
      courantAbsorbePhase: 0,
      fraisEntretienReparation: 0,
      priseCompteur: 0,
      tHuileC: 0,
      tSecheurC: 0,
      remarques: ""
    });
  }



  ngOnInit() {
    this.datafiliale.getFiliale().subscribe(
      res => {
        this.datafiliale.list = res as Filiale[]
        this.data
          .getlistCF()
          .toPromise()
          .then(res => {

            if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
              this.listCF = (res as EquipementFiliale[]).filter(x => x.filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
            }
            else {
              this.listCF = res as EquipementFiliale[]
            }
          });
        // this.listCF = res as EquipementFiliale[])
        this.data.getFicheSuivi().toPromise()
          .then(res => {
            if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
              this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur);
            }
            else {
              this.data.list = res as FicheSuivi[]
            }

            console.log(this.data.list);

          });
      });
  }




  edit(ficheSuivi: FicheSuivi) { }

  onEdit(ficheSuivi: FicheSuivi) {

    this.data.initializeFormGroupForEdit(ficheSuivi);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "70%";
    //dialogConfig.height = "100%";
    this.dialog.open(FicheSuiviPostUpdateComponent, dialogConfig);
  }
  delete(ficheSuiviID) {
    if (confirm("Vous êtes sûr de vouloir supprimer")) {
      this.data.DeleteFicheSuivi(ficheSuiviID).subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        err => {
          console.log(err);
          this.ngOnInit();
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
    //dialogConfig.height = "90%";
    this.dialog.open(FicheSuiviPostUpdateComponent, dialogConfig);
  }

  GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
    return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID);
  }

  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
    return this.datafiliale.list.find(x => x.filialeID == a);
  }

  GetExistFS(equipementId: string) {

    if (this.data.list.filter(x => x.equipementFilialeID == equipementId).length == 0) {
      console.log(this.data.list);
      return false;
    } else {
      console.log(this.data.list);
      return true;
    }
  }






}




