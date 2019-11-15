import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { FicheSuivi } from "./fiche-suivi.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataService {
  list: FicheSuivi[];

  fileList: File[] = new Array();
  ficheSuivi: FormGroup;
  formData: FormData = new FormData();


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
    etat: new FormControl("", Validators.required),
    frequenceEentretienDeshuileur: new FormControl("", Validators.required),
    courantAbsorbePhase: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    fraisEntretienReparation: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    priseCompteur: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    files: new FormControl(""),
    tHuileC: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    tSecheurC: new FormControl("", Validators.required),
    remarques: new FormControl("", Validators.required)
  });
  //

  constructor(private http: HttpClient) { }

  getFicheSuivi() {
    return this.http
      .get(environment.gestionCompresseursApi + "/Fiche_Suivi")

  }
  onUpload(event) {
    this.formData.delete('ficheSuiviFiles[]');
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


    this.formData.delete('FicheSuiviID');
    this.formData.delete('Date')
    this.formData.delete('EquipementFilialeID')
    this.formData.delete('Nbre_Heurs_Total')
    this.formData.delete('Nbre_Heurs_Charge')
    this.formData.delete('TempsArret')
    this.formData.delete('Etat')
    this.formData.delete('FrequenceEentretienDeshuileur')
    this.formData.delete('CourantAbsorbePhase')
    this.formData.delete('fraisEntretienReparation')
    this.formData.delete('PriseCompteur')
    this.formData.delete('TSecheurC')
    this.formData.delete('Remarques')
    this.formData.delete('THuileC')
    this.formData.delete('Index_Electrique')

    //
    this.formData.append('FicheSuiviID', this.form.controls.ficheSuiviID.value);
    this.formData.append('Date', this.form.controls.date.value);
    this.formData.append('EquipementFilialeID', this.form.controls.equipementFilialeID.value);
    this.formData.append('Nbre_Heurs_Total', this.form.controls.nbre_Heurs_Total.value);
    this.formData.append('Nbre_Heurs_Charge', this.form.controls.nbre_Heurs_Charge.value);
    this.formData.append('TempsArret', this.form.controls.tempsArret.value);
    this.formData.append('Etat', this.form.controls.etat.value);
    this.formData.append('FrequenceEentretienDeshuileur', this.form.controls.frequenceEentretienDeshuileur.value);
    this.formData.append('CourantAbsorbePhase', this.form.controls.courantAbsorbePhase.value);
    this.formData.append('fraisEntretienReparation', this.form.controls.fraisEntretienReparation.value);
    this.formData.append('PriseCompteur', this.form.controls.priseCompteur.value);
    this.formData.append('TSecheurC', this.form.controls.tSecheurC.value);
    this.formData.append('Remarques', this.form.controls.remarques.value);
    this.formData.append('THuileC', this.form.controls.tHuileC.value);
    this.formData.append('Index_Electrique', this.form.controls.index_Electrique.value);



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
      index_Electrique: "",
      tempsArret: "",
      etat: "",
      files: "",
      frequenceEentretienDeshuileur: "",
      courantAbsorbePhase: "",
      fraisEntretienReparation: "",
      priseCompteur: "",
      tHuileC: "",
      tSecheurC: "",
      remarques: ""
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
      etat: cons.etat,
      frequenceEentretienDeshuileur: cons.frequenceEentretienDeshuileur,
      courantAbsorbePhase: cons.courantAbsorbePhase,
      fraisEntretienReparation: cons.fraisEntretienReparation,
      priseCompteur: cons.priseCompteur,
      tHuileC: cons.tHuileC,
      tSecheurC: cons.tSecheurC,
      remarques: cons.remarques,
      files: ''
    });


  }

  getlistCF() {
    return this.http.get(
      environment.gestionCompresseursApi + "/EquipementFiliales/active"
    );
  }
}
