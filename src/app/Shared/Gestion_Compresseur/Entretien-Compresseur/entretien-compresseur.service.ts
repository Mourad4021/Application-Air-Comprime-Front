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
      typeEntretien: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.min(0)]],
      priseCompteurActuelle: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.min(0)]],
      priseCompteurDernierEntretien: ['', [Validators.required, Validators.pattern(/^-?(0|[0-9]\d*)?$/), Validators.min(0)]],
      dateDernierEntretien: ['', [Validators.required]],
      valeurCompteurProchainEntretien: [''],
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
      priseCompteurActuelle: '',
      priseCompteurDernierEntretien: '',
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
      priseCompteurActuelle: entretienCompresseur.priseCompteurActuelle,
      priseCompteurDernierEntretien: entretienCompresseur.priseCompteurDernierEntretien,
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

  refrechEntretienCompresseurList() {
    this.getEntretienCompresseur().subscribe(
      res => {
        this.list = res as EntretienCompresseur[];
      }
    )
  }
}