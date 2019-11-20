import { Component, OnInit, Input } from '@angular/core';
import { Attachement } from 'src/app/Shared/Gestion_Compresseur/Fiche_Suivi/attachement.model';
import { DataService } from 'src/app/Shared/Gestion_Compresseur/Fiche_Suivi/data.service';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
import { EntretienReservoirService } from 'src/app/Shared/Gestion_Compresseur/Entretien-Reservoir/entretien-reservoir.service';
@Component({
  selector: 'app-attachement-list',
  templateUrl: './attachement-list.component.html',
  styles: []
})
export class AttachementListComponent implements OnInit {
  attachementsList: Attachement[] = new Array()
  @Input() id: string;
  @Input() objet: string
  pdfLink: string;
  constructor(private data: DataService, private dataER: EntretienReservoirService) { }

  ngOnInit() {

    if (this.objet == 'EntretienReservoir') {
      this.dataER.getAttachementsByEntretienReservoirId(this.id).toPromise().then(res => this.attachementsList = res as Attachement[]);
    } else if (this.objet == 'FicheSuivi') {
      this.data.getAttachementsByFicheSuiviId(this.id).toPromise().then(res => this.attachementsList = res as Attachement[]);
    }

  }
  base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }
  onDownloadattachementFile(attachementId, originalname: string) {
    this.pdfLink = environment.gestionCompresseursApi + '/Attachments/getAttachementFileById?attachementId=' + attachementId
    this.data.getAttachementfileById(attachementId).subscribe(
      res => {

        let attachement = res
        var blob = new Blob([this.base64ToArrayBuffer(attachement)], { type: 'application/octet-stream' })

        saveAs(blob, originalname);

      },
      err => {

      },
      () => {

      }
    );
  }

}

