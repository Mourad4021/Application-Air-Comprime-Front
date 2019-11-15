import { Injectable } from '@angular/core';
import { Equipement } from '../Gestion_Equipements/Equipement.model';
import { EquipementFiliale } from '../Equipement-Filiale/equipement-filiale.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservoirFilialeService {
  ListEquipement: Equipement[];
  ListActiveEquipement: Equipement[];
  ListEquipementFiliale: EquipementFiliale[];
  listActiveEquipementFiliale: EquipementFiliale[];


  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }




  AddOrUpdateReservoirFilialeForm = this.fb.group(
    {
      equipementFilialeID: [],
      equipementID: [],
      filialeID: [],
      nom: [],
      active: []
    }
  )


  postReservoirFiliale() {
    return this.httpClient.post(environment.gestionCompresseursApi + '/EquipementFiliales', this.AddOrUpdateReservoirFilialeForm.value, { responseType: 'text' })
  }
  getReservoirFilialeList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales')
  }
  getactiveReservoirFilialeList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/EquipementFiliales/ReservoirFiliale')
  }
  putReservoirFiliale() {
    return this.httpClient.put(environment.gestionCompresseursApi + '/EquipementFiliales/' + this.AddOrUpdateReservoirFilialeForm.controls.equipementFilialeID.value, this.AddOrUpdateReservoirFilialeForm.value, { responseType: 'text' })
  }
  putReservoirFilialeForFakeDelete(equipementFilialeID) {
    this.getactiveReservoirFilialeList().subscribe(
      res => {
        this.listActiveEquipementFiliale = res as EquipementFiliale[]
      });
    let ReservoirFiliale = this.listActiveEquipementFiliale.find(x => x.equipementFilialeID == equipementFilialeID)
    ReservoirFiliale.active = false;
    return this.httpClient.put(environment.gestionCompresseursApi + '/EquipementFiliales/' + equipementFilialeID, ReservoirFiliale, { responseType: 'text' })
  }

  initializeAddOrUpdateReservoirFilialeFormForEdit(EquipementFiliale: EquipementFiliale) {
    this.AddOrUpdateReservoirFilialeForm.setValue({

      equipementFilialeID: EquipementFiliale.equipementFilialeID,
      equipementID: EquipementFiliale.equipementID,
      filialeID: EquipementFiliale.filialeID,
      nom: EquipementFiliale.nom,
      active: EquipementFiliale.active
    });
  }
  initializeAddOrUpdateReservoirFilialeFormForAdd() {
    this.AddOrUpdateReservoirFilialeForm.setValue({
      equipementFilialeID: '00000000-0000-0000-0000-000000000000',
      equipementID: '00000000-0000-0000-0000-000000000000',
      filialeID: '00000000-0000-0000-0000-000000000000',
      nom: '',
      active: true
    });
  }

}
