import { Injectable } from "@angular/core";
import { Consommable } from "./consommable.model";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Equipement } from '../Gestion_Equipements/Equipement.model';
import { EquipementFiliale } from '../Equipement-Filiale/equipement-filiale.model';

@Injectable({
  providedIn: "root"
})
export class DataService {

  CompresseurFilialeList: EquipementFiliale[];
  ActiveCompresseurFiliale: EquipementFiliale[];
  ActiveConsommable: Consommable[];




  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }


  AddOrUpdateConsommableForm = this.fb.group(
    {
      consommableID: new FormControl(""),
      active: new FormControl(""),
      equipementFilialeID: new FormControl("", Validators.required),
      consommationComp: new FormControl("", Validators.required),
      prixUnitaire: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required)
    }
  );



  GetEquipementFilialeByCOnsommableID(consommableID: string) {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Consommables/EquipementFilialeByCOnsommableID')
  }
  getActiveCompresseursFiliales() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseursFiliales')
  }
  postConsommable() {
    return this.httpClient.post(environment.gestionCompresseursApi + '/Consommables', this.AddOrUpdateConsommableForm.value, { responseType: 'text' })
  }
  getConsommable() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Consommables')
  }
  getactiveConsommable() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Consommables/active')
  }
  putConsommable() {
    return this.httpClient.put(environment.gestionCompresseursApi + '/Consommables/' + this.AddOrUpdateConsommableForm.controls.consommableID.value, this.AddOrUpdateConsommableForm.value, { responseType: 'text' })
  }
  putConsommableForFakeDelete(ConsommableID) {
    let consommable = this.ActiveConsommable.find(x => x.consommableID == ConsommableID)
    consommable.active = false;
    return this.httpClient.put(environment.gestionCompresseursApi + '/Consommables/' + ConsommableID, consommable, { responseType: 'text' })
  }

  initializeAddOrUpdateConsommableFormForEdit(consommable: Consommable) {
    this.AddOrUpdateConsommableForm.setValue({
      consommableID: consommable.consommableID,
      equipementFilialeID: consommable.equipementFilialeID,
      consommationComp: consommable.consommationComp,
      prixUnitaire: consommable.prixUnitaire,
      date: consommable.date,
      active: consommable.active

    });
  }
  initializeAddOrUpdateConsommableFormForAdd() {
    this.AddOrUpdateConsommableForm.setValue({
      consommableID: '00000000-0000-0000-0000-000000000000',
      active: true,
      equipementFilialeID: '00000000-0000-0000-0000-000000000000',
      consommationComp: '',
      prixUnitaire: '',
      date: ''
    });
  }


}
