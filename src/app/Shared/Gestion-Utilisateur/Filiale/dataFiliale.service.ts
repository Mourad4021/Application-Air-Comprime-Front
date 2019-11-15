import { Injectable } from "@angular/core";
import { Filiale } from "./filiale.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataFilialeService {
  list: Filiale[];
  filiale: Filiale;
  listActive: any[] = new Array();
  form: FormGroup = new FormGroup({
    filialeID: new FormControl(""),
    nom: new FormControl("", Validators.required),
    code: new FormControl("", [Validators.required]),
    conformite_d_Exploitation: new FormControl("", [Validators.required]),
    active: new FormControl("")
  });

  constructor(private http: HttpClient) { }

  getFiliale() {
    return this.http.get(environment.gestionUtilisateurApi + "/Filiale");
    //  .toPromise()
    // .then(res => (this.list = res as Filiale[]));
  }

  DeleteFiliale(filialeID) {
    let f = this.list.find(x => x.filialeID == filialeID);
    f.active = false;
    return this.http.put(
      environment.gestionUtilisateurApi + "/Filiale/" + filialeID,
      f,
      { responseType: "text" }
    );
  }

  putFiliale() {
    return this.http.put(
      environment.gestionUtilisateurApi +
      "/Filiale/" +
      this.form.controls.filialeID.value,
      this.form.value,
      { responseType: "text" }
    );
  }
  insertFiliale() {
    return this.http.post(
      environment.gestionUtilisateurApi + "/Filiale",
      this.form.value,
      { responseType: "text" }
    );
  }

  initializeFormGroup() {
    this.form.setValue({
      filialeID: "00000000-0000-0000-0000-000000000000",
      nom: "",
      code: "",
      conformite_d_Exploitation: "",
      active: true
    });
  }

  initializeFormGroupForEdit(cons: Filiale) {
    this.form.setValue({
      filialeID: cons.filialeID,
      nom: cons.nom,
      code: cons.code,
      conformite_d_Exploitation: cons.conformite_d_Exploitation,
      active: cons.active
    });
  }
  getlistCF() {
    return this.http.get(
      environment.gestionCompresseursApi + "/EquipementFiliales"
    );
  }
}
