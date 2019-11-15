import { Injectable } from "@angular/core";
import { GRHs } from "./grhs.model";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class DataService {
  rootUrl: "http://localhost:49209/api";
  list: GRHs[];
  grhs: GRHs;
  form: FormGroup = new FormGroup({
    gRhID: new FormControl(""),
    equipementFilialeID: new FormControl("", Validators.required),
    //filiale: new FormControl("", Validators.required),
    salaire: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    // charge_Compresseur: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    // charge_Secteur: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    // charge_Total: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    // compresseur_Pourcentage: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/)]),
    tauxAffectationAirComprime: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.min(0), Validators.max(100)]),
    date: new FormControl("", [Validators.required])
  });

  constructor(private http: HttpClient) { }



  getGRhs() {
    return this.http
      .get(environment.gestionCompresseursApi + "/GRHs");
    // this.http
    //   .get(environment.gestionCompresseursApi + "/GRHs")
    //   .toPromise()
    //   .then(res => (this.list = res as GRHs[]));
  }

  DeleteGRhs(gRhID) {
    return this.http.delete(environment.gestionCompresseursApi + "/GRHs/" + gRhID,
      { responseType: "text" });
  }

  putGRhs() {
    return this.http.put(
      environment.gestionCompresseursApi + "/GRHs/" + this.form.controls.gRhID.value,
      this.form.value,
      { responseType: "text" }
    );
  }

  insertGRhs() {
    return this.http.post(
      environment.gestionCompresseursApi + "/GRHs",
      this.form.value,
      { responseType: "text" }
    );
  }

  initializeFormGroup() {
    this.form.setValue({
      gRhID: "00000000-0000-0000-0000-000000000000",
      equipementFilialeID: "",
      //filiale: "",
      salaire: "",
      // charge_Compresseur: "",
      // charge_Secteur: "",
      // charge_Total: "",
      // compresseur_Pourcentage: "",
      tauxAffectationAirComprime: "",
      date: ""
    });
  }

  initializeFormGroupForEdit(cons: GRHs) {
    this.form.setValue({
      gRhID: cons.gRhID,
      equipementFilialeID: cons.equipementFilialeID,
      //filiale: cons.filiale,
      salaire: cons.salaire,
      // charge_Compresseur: cons.charge_Compresseur,
      // charge_Secteur: cons.charge_Secteur,
      // charge_Total: cons.charge_Total,
      // compresseur_Pourcentage: cons.compresseur_Pourcentage,
      tauxAffectationAirComprime: cons.tauxAffectationAirComprime,
      date: cons.date
    });
  }

  getlistCF() {
    return this.http.get(
      environment.gestionCompresseursApi + "/EquipementFiliales"
    );
  }
}


