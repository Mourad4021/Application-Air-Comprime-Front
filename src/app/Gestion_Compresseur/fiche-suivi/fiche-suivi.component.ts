import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { DataService } from "src/app/Shared/Gestion_Compresseur/Fiche_Suivi/data.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { FicheSuivi } from "src/app/Shared/Gestion_Compresseur/Fiche_Suivi/fiche-suivi.model";
import { FicheSuiviPostUpdateComponent } from "../fiche-suivi-post-update/fiche-suivi-post-update.component";
import { DataFilialeService } from "src/app/Shared/Gestion-Utilisateur/Filiale/dataFiliale.service";
import { Filiale } from "src/app/Shared/Gestion-Utilisateur/Filiale/filiale.model";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { AuthenticationService } from "src/app/Shared/AuthenticationService/authentication.service";
import { EquipementFiliale } from 'src/app/Shared/Gestion_Compresseur/Equipement-Filiale/equipement-filiale.model';


@Component({
  selector: 'app-fiche-suivi',
  templateUrl: './fiche-suivi.component.html',
  styleUrls: ['./fiche-suivi.component.sass'],

})

export class FicheSuiviComponent implements OnInit, OnChanges {

  @Input() idFS: string;
  @Input() dateFS: Date;
  @Input() changeDetect: boolean;
  @Input() pMonth: boolean;
  static dateFS1: Date;

  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public datafiliale: DataFilialeService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }



  FicheSuiviSearchFormc = this.fb.group({
    date: [""]
  });

  pg: number = 1;
  list: FicheSuivi[] = new Array();
  listF: Filiale[];
  listCF: EquipementFiliale[];

  ficheSuiviIDg = "";
  equipementFilialeIDg = "";

  nbre_Heurs_Total = 0;
  nbre_Heurs_Charge = 0;
  tempsArret = 0;

  dateg: Date;
  index_Electrique = 0;
  etat = "";
  pointDeRoseeDuSecheur = 0;
  index_Debitmetre = 0;
  fraisEntretienReparation = 0;
  priseCompteurDernierEntretien = 0;
  tHuileC = 0;
  typeDernierEntretien = '';
  remarques = "";
  nombreDeJoursOuvrablesDuMois = 0;
  nombreHeuresProductionUsineLeJourPrecedent = 0;





  ngOnChanges() {

    this.refrechFicheSuiviList();
  }
  ngOnInit() {
    this.datafiliale.getFiliale().subscribe(
      res => {

        this.datafiliale.list = res as Filiale[]
        this.data
          .getlistCF()
          .toPromise()
          .then(res => {
            (
              this.listCF = res as EquipementFiliale[])
            if (this.pMonth == true) {
              this.data.getFicheSuivi1(1).toPromise()
                .then(res => {
                  if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
                    this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
                  }
                  else {
                    this.data.list = res as FicheSuivi[]
                  }
                  this.data.getFicheSuivi1(1).toPromise()
                    .then(res => {

                      this.list = (res as FicheSuivi[]).filter(x => x.equipementFilialeID == this.idFS);

                      this.GetGlobalByIDCorrespondance();

                    });


                });
            } else {
              this.data.getFicheSuivi1(0).toPromise()
                .then(res => {

                  if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
                    this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
                  }
                  else {
                    this.data.list = res as FicheSuivi[]
                  }
                  this.data.getFicheSuivi1(0).toPromise()
                    .then(res => {

                      this.list = (res as FicheSuivi[]).filter(x => x.equipementFilialeID == this.idFS);

                      this.GetGlobalByIDCorrespondance();

                    });


                });
            }
          });
      }
    )


  }


  // ngOnInit() {
  //   this.datafiliale.getFiliale().subscribe(
  //     res => {
  //       this.datafiliale.list = res as Filiale[]
  //       this.data
  //         .getlistCF()
  //         .toPromise()
  //         .then(res => {
  //           (
  //             this.listCF = res as EquipementFiliale[])
  //           this.data.getFicheSuivi().toPromise()
  //             .then(res => {
  //               if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
  //                 this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
  //               }
  //               else {
  //                 this.data.list = res as FicheSuivi[]
  //               }
  //               this.data.getFicheSuivi().toPromise()
  //                 .then(res => {

  //                   this.list = (res as FicheSuivi[]).filter(x => x.equipementFilialeID == this.idFS);

  //                   this.GetGlobalByIDCorrespondance();

  //                 });


  //             });
  //         });
  //     }
  //   )


  // }


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
          this.refrechFicheSuiviList()

        },
        err => {
          console.log(err);

        }
      );
    }
  }
  onCreate() {
    this.data.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "95%";
    dialogConfig.height = "90%";
    this.dialog.open(FicheSuiviPostUpdateComponent, dialogConfig);
  }

  GetCompFilialeByIDCorrespondance(equipementFilialeID: string) {
    return this.listCF.find(f => f.equipementFilialeID == equipementFilialeID);
  }

  GetFilialeByIDCorrespondance(equipementFilialeID: string) {
    let a = this.listCF.find(cf => cf.equipementFilialeID == equipementFilialeID).filialeID;
    return this.datafiliale.list.find(x => x.filialeID == a);
  }

  GetGlobalByIDCorrespondance() {
    this.tHuileC = 0;
    this.tempsArret = 0;
    this.nombreHeuresProductionUsineLeJourPrecedent = 0;
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      this.ficheSuiviIDg = element.ficheSuiviID;
      this.equipementFilialeIDg = element.equipementFilialeID;


      this.tHuileC += element.tHuileC;
      this.nombreHeuresProductionUsineLeJourPrecedent += element.nombreHeuresProductionUsineLeJourPrecedent;
      this.tempsArret = this.tempsArret + element.tempsArret;

    }

    {
      this.dateg = this.list[this.list.length - 1].date;
      if (this.list.length > 1) {
        this.index_Electrique = this.list[this.list.length - 1].index_Electrique - this.list[0].index_Electrique;
      }
      else {
        this.index_Electrique = this.list[this.list.length - 1].index_Electrique;
      }
      this.etat = this.list[this.list.length - 1].etat;
      this.pointDeRoseeDuSecheur = this.list[this.list.length - 1].pointDeRoseeDuSecheur;

      this.fraisEntretienReparation = this.list[this.list.length - 1].fraisEntretienReparation;
      this.priseCompteurDernierEntretien = this.list[this.list.length - 1].priseCompteurDernierEntretien;
      this.tHuileC = this.tHuileC / this.list.length;
      this.pointDeRoseeDuSecheur = this.list[this.list.length - 1].pointDeRoseeDuSecheur;
      this.remarques = this.list.filter(x => x.remarques != 'RAS')[this.list.filter(x => x.remarques != 'RAS').length - 1].remarques;
      this.typeDernierEntretien = this.list[this.list.length - 1].typeDernierEntretien;
      this.nombreDeJoursOuvrablesDuMois = this.list[this.list.length - 1].nombreDeJoursOuvrablesDuMois;
      this.nbre_Heurs_Total = this.list[this.list.length - 1].nbre_Heurs_Total - this.list[0].nbre_Heurs_Total;
      this.nbre_Heurs_Charge = this.list[this.list.length - 1].nbre_Heurs_Charge - this.list[0].nbre_Heurs_Charge;
      this.index_Debitmetre = this.list[this.list.length - 1].index_Debitmetre - this.list[0].index_Debitmetre;

    }

  }
  refrechFicheSuiviList() {

    // this.datafiliale.getFiliale().subscribe(
    //   res => {
    //     this.datafiliale.list = res as Filiale[]
    //     this.data
    //       .getlistCF()
    //       .toPromise()
    //       .then(res => {
    //         (
    //           this.listCF = res as EquipementFiliale[])
    //         this.data.getFicheSuivi().toPromise()
    //           .then(res => {
    //             if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
    //               this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
    //             }
    //             else {
    //               this.data.list = res as FicheSuivi[]
    //             }
    //             this.data.getFicheSuivi().toPromise()
    //               .then(res => {

    //                 this.list = (res as FicheSuivi[]).filter(x => x.equipementFilialeID == this.idFS);

    //                 this.GetGlobalByIDCorrespondance();

    //               });


    //           });
    //       });
    //   }
    // )
    this.datafiliale.getFiliale().subscribe(
      res => {
        this.datafiliale.list = res as Filiale[]
        this.data
          .getlistCF()
          .toPromise()
          .then(res => {
            (
              this.listCF = res as EquipementFiliale[])
            if (this.pMonth == true) {
              this.data.getFicheSuivi1(1).toPromise()
                .then(res => {
                  if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
                    this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
                  }
                  else {
                    this.data.list = res as FicheSuivi[]
                  }
                  this.data.getFicheSuivi1(1).toPromise()
                    .then(res => {

                      this.list = (res as FicheSuivi[]).filter(x => x.equipementFilialeID == this.idFS);

                      this.GetGlobalByIDCorrespondance();

                    });


                });
            } else {
              this.data.getFicheSuivi1(0).toPromise()
                .then(res => {
                  if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
                    this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
                  }
                  else {
                    this.data.list = res as FicheSuivi[]
                  }
                  this.data.getFicheSuivi1(0).toPromise()
                    .then(res => {

                      this.list = (res as FicheSuivi[]).filter(x => x.equipementFilialeID == this.idFS);

                      this.GetGlobalByIDCorrespondance();

                    });


                });
            }
          });
      }
    )

  }
}
