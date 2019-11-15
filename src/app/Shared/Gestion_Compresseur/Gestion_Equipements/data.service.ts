import { Injectable } from '@angular/core';
import { Equipement } from './Equipement.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipementDataService {
  ListEquipement: Equipement[];
  ListSecheur: Equipement[];
  listActiveSecheur: Equipement[];
  ListReservoir: Equipement[];
  listActiveReservoir: Equipement[];
  ListCompresseur: Equipement[];
  listActiveCompresseur: Equipement[];
  constructor(private httpClient: HttpClient, private fb: FormBuilder) { }

  // ANCHOR   Equipement

  getEquipementList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Equipements')
  }
  deleteEquipement(equipementID: string) {
    return this.httpClient.delete(environment.gestionCompresseursApi + '/Equipements/' + equipementID, { responseType: 'text' })
  }

  getactiveEquipementList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Equipements/active')
  }
  // ANCHOR  Sécheur

  AddOrUpdateSecheurForm = this.fb.group(
    {
      equipementID: [''],
      fournisseurID: ['', [Validators.required]],
      capaciteTraitement: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      active: ['']
    }
  )
  postSecheur() {
    return this.httpClient.post(environment.gestionCompresseursApi + '/Secheurs', this.AddOrUpdateSecheurForm.value, { responseType: 'text' })
  }
  getSecheurList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Secheurs')
  }
  getactiveSecheurList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Secheurs/active')
  }
  putSecheur() {
    return this.httpClient.put(environment.gestionCompresseursApi + '/Secheurs/' + this.AddOrUpdateSecheurForm.controls.equipementID.value, this.AddOrUpdateSecheurForm.value, { responseType: 'text' })
  }
  putSecheurForFakeDelete(equipementID) {
    this.getactiveSecheurList().subscribe(
      res => {
        this.listActiveSecheur = res as Equipement[]
      });
    let equipement = this.listActiveSecheur.find(x => x.equipementID == equipementID)
    equipement.active = false;
    return this.httpClient.put(environment.gestionCompresseursApi + '/Secheurs/' + equipementID, equipement, { responseType: 'text' })
  }
  refrechSecheurList() {
    this.getSecheurList().subscribe(
      res => {
        this.ListEquipement = res as Equipement[];
      }
    )
  }
  DeleteSecheur(equipementID) {


    let f = this.ListEquipement.find(x => x.equipementID == equipementID);
    f.active = false;
    return this.httpClient.put(
      environment.gestionFournisseurApi + '/Secheurs/' +
      equipementID,
      f,
      { responseType: "text" }
    );
  }
  initializeAddOrUpdateSecheurFormForEdit(Equipement: Equipement) {
    this.AddOrUpdateSecheurForm.setValue({

      equipementID: Equipement.equipementID,
      fournisseurID: Equipement.fournisseurID,
      capaciteTraitement: Equipement.capaciteTraitement,
      nom: Equipement.nom,
      active: Equipement.active
    });
  }
  initializeAddOrUpdateSecheurFormForAdd() {
    this.AddOrUpdateSecheurForm.setValue({
      equipementID: '00000000-0000-0000-0000-000000000000',
      fournisseurID: '00000000-0000-0000-0000-000000000000',
      nom: ' ',
      active: true,
      capaciteTraitement: 0
    });
  }
  // ANCHOR  Compresseur
  AddOrUpdateCompresseurForm = this.fb.group(
    {
      equipementID: [''],
      fournisseurID: ['', [Validators.required]],
      debit: ['', [Validators.required]],
      puissance: ['', [Validators.required]],
      puissanceCharge: ['', [Validators.required]],
      puissanceVide: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      active: ['']
    }
  )
  postCompresseur() {
    return this.httpClient.post(environment.gestionCompresseursApi + '/Compresseurs', this.AddOrUpdateCompresseurForm.value, { responseType: 'text' })
  }
  getCompresseurList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Compresseurs')
  }
  getactiveCompresseurList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Compresseurs/active')
  }
  putCompresseur() {
    return this.httpClient.put(environment.gestionCompresseursApi + '/Compresseurs/' + this.AddOrUpdateCompresseurForm.controls.equipementID.value, this.AddOrUpdateCompresseurForm.value, { responseType: 'text' })
  }
  putCompresseurForFakeDelete(equipementID: string) {
    this.getactiveCompresseurList().subscribe(
      res => {
        this.listActiveCompresseur = res as Equipement[]
      });
    let equipement = this.listActiveCompresseur.find(x => x.equipementID == equipementID)
    equipement.active = false;
    return this.httpClient.put(environment.gestionCompresseursApi + '/Compresseurs/' + equipementID, equipement, { responseType: 'text' })
  }
  initializeAddOrUpdateCompresseurFormForEdit(Equipement: Equipement) {
    this.AddOrUpdateCompresseurForm.setValue({

      equipementID: Equipement.equipementID,
      fournisseurID: Equipement.fournisseurID,
      debit: Equipement.debit,
      puissance: Equipement.puissance,
      puissanceCharge: Equipement.puissanceCharge,
      puissanceVide: Equipement.puissanceVide,
      nom: Equipement.nom,
      active: Equipement.active
    });
  }
  initializeAddOrUpdateCompresseurFormForAdd() {
    this.AddOrUpdateCompresseurForm.setValue({
      equipementID: '00000000-0000-0000-0000-000000000000',
      fournisseurID: '00000000-0000-0000-0000-000000000000',
      nom: ' ',
      active: true,
      debit: 0,
      puissance: 0,
      puissanceCharge: 0,
      puissanceVide: 0
    });
  }
  // ANCHOR  Reservoir

  AddOrUpdateReservoirForm = this.fb.group(
    {
      equipementID: [''],
      fournisseurID: [''],
      capacite: ['', [Validators.required]],
      pms: ['', [Validators.required]],
      pe: ['', [Validators.required]],
      anneeFabrication: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.minLength(4), Validators.maxLength(4)]],
      nom: ['', [Validators.required]],
      active: ['']
    }
  )
  postReservoir() {
    return this.httpClient.post(environment.gestionCompresseursApi + '/Reservoirs', this.AddOrUpdateReservoirForm.value, { responseType: 'text' })
  }
  getReservoirList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Reservoirs')
  }
  getactiveReservoirList() {
    return this.httpClient.get(environment.gestionCompresseursApi + '/Reservoirs/active')
  }
  putReservoir() {
    return this.httpClient.put(environment.gestionCompresseursApi + '/Reservoirs/' + this.AddOrUpdateReservoirForm.controls.equipementID.value, this.AddOrUpdateReservoirForm.value, { responseType: 'text' })
  }
  putReservoirForFakeDelete(equipementID: string) {
    this.getactiveReservoirList().subscribe(
      res => {
        this.listActiveReservoir = res as Equipement[]
      });
    let equipement = this.listActiveReservoir.find(x => x.equipementID == equipementID)
    equipement.active = false;
    return this.httpClient.put(environment.gestionCompresseursApi + '/Reservoirs/' + equipementID, equipement, { responseType: 'text' })
  }
  initializeAddOrUpdateReservoirFormForEdit(Equipement: Equipement) {
    this.AddOrUpdateReservoirForm.setValue({

      equipementID: Equipement.equipementID,
      fournisseurID: Equipement.fournisseurID,
      capacite: Equipement.capacite,
      pms: Equipement.pms,
      pe: Equipement.pe,
      anneeFabrication: Equipement.anneeFabrication,
      nom: Equipement.nom,
      active: Equipement.active
    });
  }
  initializeAddOrUpdateReservoirFormForAdd() {
    this.AddOrUpdateReservoirForm.setValue({
      equipementID: '00000000-0000-0000-0000-000000000000',
      fournisseurID: '00000000-0000-0000-0000-000000000000',
      nom: '',
      active: true,
      capacite: 0,
      pms: 0,
      pe: 0,
      anneeFabrication: 2019
    });
  }
}