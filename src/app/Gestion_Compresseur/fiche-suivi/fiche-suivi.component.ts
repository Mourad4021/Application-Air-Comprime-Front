import { Component, OnInit, Input } from "@angular/core";
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

export class FicheSuiviComponent implements OnInit {
  @Input() idFS: string;
  @Input() dateFS: Date;

  static dateFS1: Date;

  constructor(
    public data: DataService,
    public dialog: MatDialog,
    public datafiliale: DataFilialeService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }

  etatList: any[] = ["En_marche", "En_panne", "Reserve"];

  FicheSuiviSearchFormc = this.fb.group({
    date: [""]
  });

  pg: number = 1;
  list: FicheSuivi[] = new Array();
  listF: Filiale[];
  listCF: EquipementFiliale[];

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


  ficheSuiviIDg = "";
  equipementFilialeIDg = "";

  nbre_Heurs_Total = 0;
  nbre_Heurs_Charge = 0;
  tempsArret = 0;

  dateg: Date;
  index_Electrique = 0;
  etat = "";
  frequenceEentretienDeshuileur = "";
  courantAbsorbePhase = 0;
  fraisEntretienReparation = 0;
  priseCompteur = 0;
  tHuileC = 0;
  tSecheurC = "";
  remarques = "";





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
            (
              this.listCF = res as EquipementFiliale[])
            this.data.getFicheSuivi().toPromise()
              .then(res => {
                if (this.authService.currentUserValue.Role_Utilisateur == 'Responsable') {
                  this.data.list = (res as FicheSuivi[]).filter(x => this.GetFilialeByIDCorrespondance(x.equipementFilialeID).filialeID == this.authService.currentUserValue.Filiale_Utilisateur)
                }
                else {
                  this.data.list = res as FicheSuivi[]
                }
                this.data.getFicheSuivi().toPromise()
                  .then(res => {

                    this.list = (res as FicheSuivi[]).filter(x => x.equipementFilialeID == this.idFS);

                    this.GetGlobalByIDCorrespondance();

                  });


              });
          });
      }
    )


  }


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

  GetGlobalByIDCorrespondance() {

    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      this.ficheSuiviIDg = element.ficheSuiviID;
      this.equipementFilialeIDg = element.equipementFilialeID;

      this.nbre_Heurs_Total = this.nbre_Heurs_Total + element.nbre_Heurs_Total;
      this.nbre_Heurs_Charge = this.nbre_Heurs_Charge + element.nbre_Heurs_Charge;

      this.tempsArret = this.tempsArret + element.tempsArret;

    }

    {
      this.dateg = this.list[this.list.length - 1].date;
      this.index_Electrique = this.list[this.list.length - 1].index_Electrique - this.list[0].index_Electrique;

      this.etat = this.list[this.list.length - 1].etat;
      this.frequenceEentretienDeshuileur = this.list[this.list.length - 1].frequenceEentretienDeshuileur;
      this.courantAbsorbePhase = this.list[this.list.length - 1].courantAbsorbePhase;
      this.fraisEntretienReparation = this.list[this.list.length - 1].fraisEntretienReparation;
      this.priseCompteur = this.list[this.list.length - 1].priseCompteur;
      this.tHuileC = this.list[this.list.length - 1].tHuileC;
      this.tSecheurC = this.list[this.list.length - 1].tSecheurC;
      this.remarques = this.list[this.list.length - 1].remarques;
    }

  }

}
