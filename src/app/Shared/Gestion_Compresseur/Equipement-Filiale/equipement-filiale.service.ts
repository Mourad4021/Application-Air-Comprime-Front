import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { EquipementFiliale } from './equipement-filiale.model';


@Injectable({
  providedIn: 'root'
})
export class EquipementFilialeService {
  filialeId: string;
  userRole: string;
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
      haveDebitMetre: [],
      haveElectricCounter: [],
      efid: []
    }
  )
  postCompresseurSecheurFiliale() {
    return this.httpClient.post(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseurSecheurFiliales', this.AddOrUpdateCompresseurSecheurFiliale.value, { responseType: 'text' })
  }
  getDateNow() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/datenow')
  }
  getCompresseurSecheurFiliale() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseurSecheurFiliales')
  }
  getCompresseurFilialeParFilialeID() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseursFilialesParFiliale?filialeID=' + this.filialeId)
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
  getCompresseursFiliales() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/CompresseursFiliales')
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
      haveDebitMetre: EquipementFiliale.haveDebitMetre,
      haveElectricCounter: EquipementFiliale.haveElectricCounter,
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
      numSerie: 0,
      haveDebitMetre: true,
      haveElectricCounter: true
    });
  }

}
