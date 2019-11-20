import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Fournisseur } from "./Fournisseur.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class GestionFournisseurDataService {
  formData: FormData = new FormData();
  fileList: File[] = new Array();
  list: Fournisseur[] = new Array();
  listbyid: Fournisseur[];
  listActive: any[] = new Array();
  fournisseur: Fournisseur;
  form: FormGroup = new FormGroup({
    fournisseurID: new FormControl(""),
    nom: new FormControl("", Validators.required),
    constructeur: new FormControl("", Validators.required),
    frequence_Des_Entretiens_Compresseur: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    frequence_Des_Entretiens_Secheur: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    adresse: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    active: new FormControl(""),
    files: new FormControl("")
  });

  constructor(private http: HttpClient) { }

  getFournisseur() {
    return this.http.get(
      environment.gestionFournisseurApi + "/GestionFournisseur"
    );
  }

  DeleteFournisseur(fournisseurID) {
    let f = this.list.find(x => x.fournisseurID == fournisseurID);
    f.active = false;
    return this.http.put(
      environment.gestionFournisseurApi +
      "/GestionFournisseur/" +
      fournisseurID,
      f,
      { responseType: "text" }
    );
  }
  getAttachementsByFournisseurId(fournisseurId: string) {
    return this.http.get(environment.gestionFournisseurApi + '/AttachementFournisseurs/getAttachementsByFournisseurId?fournisseuId=' + fournisseurId)
  }


  getAttachementFournisseurfileById(attachemntId: string) {
    return this.http.get(environment.gestionFournisseurApi + '/AttachementFournisseurs/getAttachementFournisseurFileById?attachementId=' + attachemntId)
  }
  initializeFormGroup() {
    this.form.setValue({
      fournisseurID: "00000000-0000-0000-0000-000000000000",
      nom: "",
      constructeur: "",
      frequence_Des_Entretiens_Compresseur: 0,
      frequence_Des_Entretiens_Secheur: 0,
      adresse: "",
      email: "",
      active: true,
      files: ''
    });
  }

  initializeFormGroupForEdit(comp: Fournisseur) {
    this.form.setValue({
      fournisseurID: comp.fournisseurID,
      nom: comp.nom,
      constructeur: comp.constructeur,
      frequence_Des_Entretiens_Compresseur:
        comp.frequence_Des_Entretiens_Compresseur,
      frequence_Des_Entretiens_Secheur: comp.frequence_Des_Entretiens_Secheur,
      adresse: comp.adresse,
      email: comp.email,
      active: comp.active,
      files: ''
    });
  }

  putFournisseur() {
    return this.http.put(
      environment.gestionFournisseurApi +
      "/GestionFournisseur/" +
      this.form.controls.fournisseurID.value,
      this.form.value,
      { responseType: "text" }
    );
  }
  onUpload(event) {
    this.formData.delete('entretienReservoirID[]');
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {

        this.formData.append('entretienReservoirID[]', event.target.files[i]);
        this.fileList.push(event.target.files[i] as File);

      }

      //console.log(reader.result);
    }
  }
  insertFournisseur() {
    this.formData.delete('fournisseurID');
    this.formData.delete('nom')
    this.formData.delete('constructeur')
    this.formData.delete('frequence_Des_Entretiens_Compresseur')
    this.formData.delete('frequence_Des_Entretiens_Secheur')
    this.formData.delete('adresse')
    this.formData.delete('email')



    //
    this.formData.append('fournisseurID', this.form.controls.fournisseurID.value);
    this.formData.append('nom', this.form.controls.nom.value);
    this.formData.append('constructeur', this.form.controls.constructeur.value);
    this.formData.append('frequence_Des_Entretiens_Compresseur', this.form.controls.frequence_Des_Entretiens_Compresseur.value);
    this.formData.append('frequence_Des_Entretiens_Secheur', this.form.controls.frequence_Des_Entretiens_Secheur.value);
    this.formData.append('adresse', this.form.controls.adresse.value);
    this.formData.append('email', this.form.controls.email.value);
    return this.http.post(
      environment.gestionFournisseurApi + "/GestionFournisseur",
      this.formData,
      { responseType: "text" }
    );
  }
}
