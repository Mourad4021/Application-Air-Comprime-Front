import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EquipementFiliale } from './equipement-filiale.model';


@Injectable({
  providedIn: 'root'
})
export class EquipementFilialeService {

  CompresseurSecheurFilialeList: EquipementFiliale[];
  constructor(private httpClient: HttpClient, private fb: FormBuilder) {

  }



  AddOrUpdateCompresseurSecheurFiliale = this.fb.group(
    {
      equipementFilialeID: [],
      equipementID: [],
      filialeID: [],
      nom: [],
      active: [],
      equipementFilialeCompSechID: [],
      prixAcquisition: [],
      dateAcquisition: [],
      numSerie: [],
      efid: []
    }
  )
  postCompresseurSecheurFiliale() {
    return this.httpClient.post(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseurSecheurFiliales', this.AddOrUpdateCompresseurSecheurFiliale.value, { responseType: 'text' })
  }
  getDateNow() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/DateNow')
  }
  getCompresseurSecheurFiliale() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseurSecheurFiliales')
  }
  putCompresseurSecheurFiliale() {
    return this.httpClient.put(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseurSecheurFiliales/', this.AddOrUpdateCompresseurSecheurFiliale.value, { responseType: 'text' })
  }
  getactiveEquipementFilialeList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/active')
  }
  putCompresseurSecheurFilialeForFakeDelete(equipementFilialeID) {
    let CompresseurSecheurFiliale = this.CompresseurSecheurFilialeList.find(x => x.equipementFilialeID == equipementFilialeID)
    CompresseurSecheurFiliale.active = false;
    return this.httpClient.put(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseurSecheurFiliales/', CompresseurSecheurFiliale, { responseType: 'text' })
  }


  initializeAddOrUpdateCompresseurSecheurFilialeForEdit(EquipementFiliale: EquipementFiliale) {
    this.AddOrUpdateCompresseurSecheurFiliale.setValue({

      equipementFilialeID: EquipementFiliale.equipementFilialeID,
      equipementID: EquipementFiliale.equipementID,
      filialeID: EquipementFiliale.filialeID,
      nom: EquipementFiliale.nom,
      active: EquipementFiliale.active,
      equipementFilialeCompSechID: EquipementFiliale.equipementFilialeCompSechID,
      prixAcquisition: EquipementFiliale.prixAcquisition,
      dateAcquisition: EquipementFiliale.dateAcquisition,
      numSerie: EquipementFiliale.numSerie,
      efid: EquipementFiliale.efid
    });
  }
  initializeAddOrUpdateCompresseurSecheurFilialeForAdd() {

    this.AddOrUpdateCompresseurSecheurFiliale.setValue({

      equipementFilialeID: '00000000-0000-0000-0000-000000000000',
      equipementID: '00000000-0000-0000-0000-000000000000',
      filialeID: '00000000-0000-0000-0000-000000000000',
      nom: '',
      active: true,
      equipementFilialeCompSechID: '00000000-0000-0000-0000-000000000000',
      efid: '00000000-0000-0000-0000-000000000000',
      prixAcquisition: 0,
      dateAcquisition: '',
      numSerie: 0
    });
  }

}
