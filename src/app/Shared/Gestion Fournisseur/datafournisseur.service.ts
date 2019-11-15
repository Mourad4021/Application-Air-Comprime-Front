import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Fournisseur } from "./Fournisseur.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class GestionFournisseurDataService {
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
    active: new FormControl("")
  });

  constructor(private http: HttpClient) {}

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

  initializeFormGroup() {
    this.form.setValue({
      fournisseurID: "00000000-0000-0000-0000-000000000000",
      nom: "",
      constructeur: "",
      frequence_Des_Entretiens_Compresseur: 0,
      frequence_Des_Entretiens_Secheur: 0,
      adresse: "",
      email: "",
      active: true
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
      active: comp.active
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

  insertFournisseur() {
    return this.http.post(
      environment.gestionFournisseurApi + "/GestionFournisseur",
      this.form.value,
      { responseType: "text" }
    );
  }
}
