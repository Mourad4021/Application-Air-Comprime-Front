import { Component, OnInit, Input } from '@angular/core';
import { GestionFournisseurDataService } from 'src/app/Shared/Gestion Fournisseur/datafournisseur.service';
import { AttachementFournisseur } from 'src/app/Shared/Gestion Fournisseur/attachement-fournisseur.Model';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-attachement-fournisseur',
  templateUrl: './attachement-fournisseur.component.html',
  styles: []
})
export class AttachementFournisseurComponent implements OnInit {
  @Input() id: string;
  attachementsList: AttachementFournisseur[] = new Array()
  pdfLink: string;
  constructor(private DataFour: GestionFournisseurDataService) { }

  ngOnInit() {

    this.DataFour.getAttachementsByFournisseurId(this.id).toPromise().then(res => this.attachementsList = res as AttachementFournisseur[]);


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

    this.pdfLink = environment.gestionFournisseurApi + '/AttachementFournisseurs/getAttachementFournisseurFileById?attachementId=' + attachementId
    this.DataFour.getAttachementFournisseurfileById(attachementId).subscribe(
      res => {
        debugger
        let attachement = res
        var blob = new Blob([this.base64ToArrayBuffer(attachement)], { type: 'application/octet-stream' })

        saveAs(blob, originalname);

      },
      err => {
        debugger
      },
      () => {
        debugger
      }
    );
  }


}




