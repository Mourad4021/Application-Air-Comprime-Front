import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntretienCompresseur } from './entretien-compresseur.model';
import { Validators, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EntretienCompresseurService {
  AddOrUpdateEntretienCompresseurForm = this.fb.group(
    {
      entretienCompresseurID: [''],
      equipementFilialeID: ['', [Validators.required]],

      typeEntretien: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.min(1)]],
      priseCompteurActuelle: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.min(1)]],
      priseCompteurDernierEntretien: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.min(0)]],
      dateDernierEntretien: [''],
      valeurCompteurProchainEntretien: [0],

      commentaires: [''],

    })
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  list: EntretienCompresseur[]
  getEntretienCompresseur() {
    return this.http
      .get(environment.gestionCompresseursApi + "/EntretienCompresseurs")
    //     .toPromise()
    //     .then(res => (this.list = res as EntretienCompresseur[]));
    // 
  }


  DeleteEntretienCompresseur(entretienCompresseurID) {
    return this.http.delete(
      environment.gestionCompresseursApi + "/EntretienCompresseurs/" + entretienCompresseurID,
      {
        responseType: "text"
      }
    );
  }

  initializeAddOrUpdateEntretienCompresseurFormForAdd() {
    this.AddOrUpdateEntretienCompresseurForm.setValue({
      entretienCompresseurID: '00000000-0000-0000-0000-000000000000',
      equipementFilialeID: '',
      typeEntretien: '',
      priseCompteurDernierEntretienActuelle: '',
      priseCompteurDernierEntretienDernierEntretien: '',
      dateDernierEntretien: '',
      valeurCompteurProchainEntretien: 0,
      commentaires: 'RAS'
    });
  }
  initializeAddOrUpdateEntretienCompresseurFormForEdit(entretienCompresseur: EntretienCompresseur) {
    this.AddOrUpdateEntretienCompresseurForm.setValue({
      entretienCompresseurID: entretienCompresseur.entretienCompresseurID,
      equipementFilialeID: entretienCompresseur.equipementFilialeID,
      typeEntretien: entretienCompresseur.typeEntretien,
      priseCompteurDernierEntretienActuelle: entretienCompresseur.priseCompteurDernierEntretienActuelle,
      priseCompteurDernierEntretienDernierEntretien: entretienCompresseur.priseCompteurDernierEntretienDernierEntretien,
      dateDernierEntretien: entretienCompresseur.dateDernierEntretien,
      valeurCompteurProchainEntretien: entretienCompresseur.valeurCompteurProchainEntretien,
      commentaires: entretienCompresseur.commentaires
    });
  }

  postEntretienCompresseur() {
    return this.http.post(environment.gestionCompresseursApi + '/EntretienCompresseurs', this.AddOrUpdateEntretienCompresseurForm.value, { responseType: 'text' })
  }
  updateEntretienCompresseur() {
    return this.http.put
      (environment.gestionCompresseursApi + '/EntretienCompresseurs/' +
        this.AddOrUpdateEntretienCompresseurForm.controls.entretienCompresseurID.value,
        this.AddOrUpdateEntretienCompresseurForm.value, { responseType: 'text' })
  }
  // putEntretienCompresseurForFakeDelete(EntretienCompresseurID) {
  //   let entretienCompresseur = this.list.find(x => x.entretienCompresseurID == EntretienCompresseurID)
  //   entretienCompresseur.active = false;
  //   return this.http.put(environment.gestionCompresseursApi + '/EntretienCompresseurs/' +
  //     EntretienCompresseurID,
  //     entretienCompresseur, { responseType: 'text' })
  // }
  refrechEntretienCompresseurList() {
    this.getEntretienCompresseur().subscribe(
      res => {
        this.list = res as EntretienCompresseur[];
      }
    )
  }
}