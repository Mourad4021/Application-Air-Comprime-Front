import { Injectable } from "@angular/core";
import { Consommable } from "./consommable.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class DataService {
  rootUrl: "http://localhost:49211/api";
  list: Consommable[];
  consommable: Consommable;
  form: FormGroup = new FormGroup({
    consommableID: new FormControl(""),
    equipementFilialeID: new FormControl("", Validators.required),
    consommationComp: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    prixUnitaire: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    //  frais_d_Electricite_Mensuels: new FormControl(""),
    date: new FormControl("", [Validators.required])
  });

  constructor(private http: HttpClient) { }

  getConsommable() {
    return this.http
      .get(environment.gestionCompresseursApi + "/Consommables")
    // .toPromise()
    // .then(res => (this.list = res as Consommable[])
    // );
  }

  DeleteConsommable(consommableID) {
    return this.http.delete(
      environment.gestionCompresseursApi + "/Consommables/" + consommableID,
      { responseType: "text" }
    );
  }

  initializeFormGroup() {
    this.form.setValue({
      consommableID: "00000000-0000-0000-0000-000000000000",
      equipementFilialeID: "",
      consommationComp: "",
      prixUnitaire: "",
      // frais_d_Electricite_Mensuels: "",

      date: ""
    });
  }

  initializeFormGroupForEdit(cons: Consommable) {
    this.form.setValue({
      consommableID: cons.consommableID,
      equipementFilialeID: cons.equipementFilialeID,
      consommationComp: cons.consommationComp,
      prixUnitaire: cons.prixUnitaire,
      // frais_d_Electricite_Mensuels: cons.frais_d_Electricite_Mensuels,

      date: cons.date
    });
  }

  putConsommable() {
    return this.http.put(
      environment.gestionCompresseursApi + "/Consommables/" +
      this.form.controls.consommableID.value,
      this.form.value,
      { responseType: "text" }
    );
  }

  insertConsommable() {
    return this.http.post(
      environment.gestionCompresseursApi + "/Consommables",
      this.form.value,
      { responseType: "text" }
    );
  }
  ///////////////////////////////////////////////////////////////////////////
  getlistCF() {
    return this.http.get(
      // environment.gestionCompresseursApi + "/EquipementFiliale"
      environment.gestionCompresseursApi + '/EquipementFiliales'
    );
  }
  getlistF() {
    return this.http.get(
      environment.gestionUtilisateurApi + "/Filiale"
    );
  }

}
