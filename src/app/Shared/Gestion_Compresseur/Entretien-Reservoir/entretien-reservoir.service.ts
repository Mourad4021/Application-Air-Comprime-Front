import { Injectable } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EntretienReservoir } from './entretien-reservoir.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntretienReservoirService {
  formData: FormData = new FormData();
  fileList: File[] = new Array();
  AddOrUpdateEntretienReservoirForm = this.fb.group(
    {
      entretienReservoirID: [''],
      equipementFilialeID: ['', [Validators.required]],
      natureVisite: ['', [Validators.required]],
      derniereVisite: ['', [Validators.required]],
      prochaineVisite: ['', [Validators.required]],
      commentaires: [''],
      files: ['']

    })
  constructor(private http: HttpClient, private fb: FormBuilder) { }
  list: EntretienReservoir[]

  getEntretienReservoir() {
    return this.http
      .get(environment.gestionCompresseursApi + "/EntretienReservoirs")

  }


  DeleteEntretienReservoir(entretienReservoirID) {
    return this.http.delete(
      environment.gestionCompresseursApi + "/EntretienReservoirs/" + entretienReservoirID,
      {
        responseType: "text"
      }
    );
  }

  getDate() {
    return this.http.get(environment.gestionCompresseursApi + "/EntretienReservoirs/date")
  }

  initializeAddOrUpdateEntretienReservoirFormForAdd() {
    this.AddOrUpdateEntretienReservoirForm.setValue({
      entretienReservoirID: '00000000-0000-0000-0000-000000000000',
      equipementFilialeID: '',
      natureVisite: '',
      derniereVisite: '',
      prochaineVisite: '',
      commentaires: 'RAS',
      files: ''
    });
  }
  getAttachementsByEntretienReservoirId(entretienReservoirId: string) {
    return this.http.get(environment.gestionCompresseursApi + '/Attachments/getAttachementsByEntretienRervoirID?entretienReservoirID=' + entretienReservoirId)
  }


  getAttachementfileById(attachemntId: string) {
    return this.http.get(environment.gestionCompresseursApi + '/Attachments/getAttachementFileById?attachementId=' + attachemntId)
  }
  initializeAddOrUpdateEntretienReservoirFormForEdit(entretienReservoir: EntretienReservoir) {
    this.AddOrUpdateEntretienReservoirForm.setValue({
      entretienReservoirID: entretienReservoir.entretienReservoirID,
      equipementFilialeID: entretienReservoir.equipementFilialeID,
      natureVisite: entretienReservoir.natureVisite,
      derniereVisite: entretienReservoir.derniereVisite,
      prochaineVisite: entretienReservoir.prochaineVisite,
      commentaires: entretienReservoir.commentaires,
      files: ''
    });
  }

  onUpload(event) {
    this.formData.delete('entretienReservoirID[]');
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {

        this.formData.append('entretienReservoirID[]', event.target.files[i]);
        this.fileList.push(event.target.files[i] as File);

      }

      //console.log(reader.result);
    }
  }

  postEntretienReservoir() {
    this.formData.delete('entretienReservoirID');
    this.formData.delete('equipementFilialeID')
    this.formData.delete('natureVisite')
    this.formData.delete('derniereVisite')
    this.formData.delete('prochaineVisite')
    this.formData.delete('commentaires')


    //
    this.formData.append('entretienReservoirID', this.AddOrUpdateEntretienReservoirForm.controls.entretienReservoirID.value);
    this.formData.append('equipementFilialeID', this.AddOrUpdateEntretienReservoirForm.controls.equipementFilialeID.value);
    this.formData.append('natureVisite', this.AddOrUpdateEntretienReservoirForm.controls.natureVisite.value);
    this.formData.append('derniereVisite', this.AddOrUpdateEntretienReservoirForm.controls.derniereVisite.value);
    this.formData.append('prochaineVisite', this.AddOrUpdateEntretienReservoirForm.controls.prochaineVisite.value);
    this.formData.append('commentaires', this.AddOrUpdateEntretienReservoirForm.controls.commentaires.value);



    return this.http.post(environment.gestionCompresseursApi + '/EntretienReservoirs/', this.formData, { responseType: 'text' })
  }
  updateEntretienReservoir() {
    return this.http.put(environment.gestionCompresseursApi + '/EntretienReservoirs/' +
      this.AddOrUpdateEntretienReservoirForm.controls.entretienReservoirID.value,
      this.AddOrUpdateEntretienReservoirForm.value, { responseType: 'text' })
  }

  refrechEntretienReservoirList() {
    this.getEntretienReservoir().subscribe(
      res => {
        this.list = res as EntretienReservoir[];
      }
    )
  }
}