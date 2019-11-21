import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { FicheSuivi } from "./fiche-suivi.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataService {
  list: FicheSuivi[] = new Array();
  changeDetect: boolean;
  fileList: File[] = new Array();
  ficheSuivi: FormGroup;
  formData: FormData = new FormData();
  etatList: string[] = ["En_marche", "En_panne", "Reserve"];
  typeEntretienList: string[] = ['A', 'B', 'C', 'D'];

  form: FormGroup = new FormGroup({
    ficheSuiviID: new FormControl(""),
    equipementFilialeID: new FormControl("", Validators.required),
    date: new FormControl("", Validators.required),
    nbre_Heurs_Total: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),

    nbre_Heurs_Charge: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    index_Electrique: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    tempsArret: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    etat: new FormControl("", [Validators.required, Validators.min(0)]),
    pointDeRoseeDuSecheur: new FormControl("", [Validators.required]),
    index_Debitmetre: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    fraisEntretienReparation: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    priseCompteurDernierEntretien: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),

    files: new FormControl(""),
    tHuileC: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/),
      Validators.min(0)
    ]),
    typeDernierEntretien: new FormControl("", Validators.required),
    remarques: new FormControl("", Validators.required),
    nombreDeJoursOuvrablesDuMois: new FormControl(0),
    nombreHeuresProductionUsineLeJourPrecedent: new FormControl(0, [Validators.required, Validators.max(24), Validators.min(0)]),
  });
  //

  constructor(private http: HttpClient) { }

  getFicheSuivi() {
    return this.http
      .get(environment.gestionCompresseursApi + "/Fiche_Suivi")

  }

  getFicheSuivi1(last: number) {
    return this.http
      .get(environment.gestionCompresseursApi + "/Fiche_Suivi/triM/" + last)

  }

  onUpload(event) {
    this.formData.delete('ficheSuiviFiles[]');
    this.fileList = new Array()
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {

        this.formData.append('ficheSuiviFiles[]', event.target.files[i]);
        this.fileList.push(event.target.files[i] as File);

      }


      //console.log(reader.result);
    }
  }
  DeleteFicheSuivi(ficheSuiviID) {
    return this.http.delete(
      environment.gestionCompresseursApi + "/Fiche_Suivi/" + ficheSuiviID,
      {
        responseType: "text"
      }
    );
  }

  putFicheSuivi() {
    return this.http.put(
      environment.gestionCompresseursApi +
      "/Fiche_Suivi/" +
      this.form.controls.ficheSuiviID.value,
      this.form.value,
      { responseType: "text" }
    );
  }

  getAttachementsByFicheSuiviId(ficheSuiviId: string) {
    return this.http.get(environment.gestionCompresseursApi + '/Attachments/getAttachementsByFicheSuiviId?ficheSuiviId=' + ficheSuiviId)
  }


  getAttachementfileById(attachemntId: string) {
    return this.http.get(environment.gestionCompresseursApi + '/Attachments/getAttachementFileById?attachementId=' + attachemntId)
  }


  insertFicheSuivi() {

    //
    this.formData.delete('FicheSuiviID');
    this.formData.delete('EquipementFilialeID')
    this.formData.delete('FraisEntretienReparation')
    this.formData.delete('Date')
    this.formData.delete('Etat')
    this.formData.delete('pointDeRoseeDuSecheur')
    this.formData.delete('TempsArret')
    this.formData.delete('Nbre_Heurs_Total')
    this.formData.delete('Nbre_Heurs_Charge')
    this.formData.delete('Index_Debitmetre')
    this.formData.delete('priseCompteurDernierEntretien');
    this.formData.delete('Index_Electrique')
    this.formData.delete('Remarques')
    this.formData.delete('THuileC')
    this.formData.delete('TypeDernierEntretien');
    this.formData.delete('NombreHeuresProductionUsineLeJourPrecedent');
    this.formData.delete('NombreDeJoursOuvrablesDuMois');

    //
    this.formData.append('FicheSuiviID', this.form.controls.ficheSuiviID.value);
    this.formData.append('Date', this.form.controls.date.value);
    this.formData.append('EquipementFilialeID', this.form.controls.equipementFilialeID.value);
    this.formData.append('Nbre_Heurs_Total', this.form.controls.nbre_Heurs_Total.value);
    this.formData.append('Nbre_Heurs_Charge', this.form.controls.nbre_Heurs_Charge.value);
    this.formData.append('TempsArret', this.form.controls.tempsArret.value);
    this.formData.append('Etat', this.form.controls.etat.value);
    this.formData.append('pointDeRoseeDuSecheur', this.form.controls.pointDeRoseeDuSecheur.value);
    this.formData.append('Index_Debitmetre', this.form.controls.index_Debitmetre.value);
    this.formData.append('FraisEntretienReparation', this.form.controls.fraisEntretienReparation.value);
    this.formData.append('priseCompteurDernierEntretien', this.form.controls.priseCompteurDernierEntretien.value);
    this.formData.append('Remarques', this.form.controls.remarques.value);
    this.formData.append('THuileC', this.form.controls.tHuileC.value);
    this.formData.append('Index_Electrique', this.form.controls.index_Electrique.value);
    this.formData.append('TypeDernierEntretien', this.form.controls.typeDernierEntretien.value)
    this.formData.append('NombreHeuresProductionUsineLeJourPrecedent', this.form.controls.nombreHeuresProductionUsineLeJourPrecedent.value)
    this.formData.append('NombreDeJoursOuvrablesDuMois', this.form.controls.nombreDeJoursOuvrablesDuMois.value)


    return this.http.post(
      environment.gestionCompresseursApi + "/Fiche_Suivi",
      this.formData,
      { responseType: "text" }
    );
  }

  initializeFormGroup() {
    this.form.setValue({
      ficheSuiviID: "00000000-0000-0000-0000-000000000000",
      date: "",
      equipementFilialeID: "",
      nbre_Heurs_Total: "",
      nbre_Heurs_Charge: "",
      index_Electrique: 0,
      tempsArret: "",
      etat: "En_marche",
      files: "",
      nombreDeJoursOuvrablesDuMois: 0,
      pointDeRoseeDuSecheur: "",
      index_Debitmetre: 0,
      fraisEntretienReparation: "",
      priseCompteurDernierEntretien: "",
      tHuileC: "",
      typeDernierEntretien: "A",
      remarques: "RAS",
      nombreHeuresProductionUsineLeJourPrecedent: 0
    });

  }




  initializeFormGroupForEdit(cons: FicheSuivi) {

    this.form.setValue({
      ficheSuiviID: cons.ficheSuiviID,
      date: cons.date,
      equipementFilialeID: cons.equipementFilialeID,
      nbre_Heurs_Total: cons.nbre_Heurs_Total,
      nbre_Heurs_Charge: cons.nbre_Heurs_Charge,
      index_Electrique: cons.index_Electrique,
      tempsArret: cons.tempsArret,
      etat: this.etatList[cons.etat],
      pointDeRoseeDuSecheur: cons.pointDeRoseeDuSecheur,
      index_Debitmetre: cons.index_Debitmetre,
      fraisEntretienReparation: cons.fraisEntretienReparation,
      priseCompteurDernierEntretien: cons.priseCompteurDernierEntretien,
      tHuileC: cons.tHuileC,
      typeDernierEntretien: this.typeEntretienList[cons.typeDernierEntretien],
      remarques: cons.remarques,
      files: '',
      nombreHeuresProductionUsineLeJourPrecedent: cons.nombreHeuresProductionUsineLeJourPrecedent,
      nombreDeJoursOuvrablesDuMois: cons.nombreDeJoursOuvrablesDuMois

    });


  }

  getlistCF() {
    return this.http.get(
      environment.gestionCompresseursApi + "/EquipementFiliales/active"
    );
  }
  getlistCopresseur_Secheur() {
    return this.http.get(
      environment.gestionCompresseursApi + "/EquipementFiliales/CompresseurSecheurFiliales"
    );
  }
}
