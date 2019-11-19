import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmailMessage } from './email-message.model';
import { EmailFrom } from './email-from.model';
import { Users } from '../Gestion-Utilisateur/Users/users.model';
import { Filiale } from '../Gestion-Utilisateur/Filiale/filiale.model';
import { ToastrService } from 'ngx-toastr';
import { DataUsersService } from '../Gestion-Utilisateur/Users/dataUsers.service';
import { MatSnackBar } from '@angular/material';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  emailFrom: EmailFrom[];
  list: Users[];

  emailMessage: EmailMessage;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  address: string;
  idFiliale: string;


  form: FormGroup = new FormGroup({
    toAddresses: new FormControl('', [RequiredValidator, ToAddressValidator]),
    fromAddresses: new FormControl(''),
    files: new FormControl(''),
    subject: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    posteNumber: new FormControl(''),
    phoneNumber: new FormControl(''),
    idFiliale: new FormControl('')
  });

  constructor(private http: HttpClient, public toastr: ToastrService, public dataUsersService: DataUsersService, public _snackBar: MatSnackBar) {
    if (this.currentUser !== null) {
      this.address = '"' + this.currentUser.Mail_Utilisateur + '"';
      this.idFiliale = this.currentUser.Filiale_Utilisateur;

    }
  }
  filiale: Filiale[];
  nom: string;
  initializeFormGroup() {

    this.form.setValue({
      toAddresses: '',
      fromAddresses: '',
      content: '',
      subject: '',
      files: '',
      posteNumber: 0,
      phoneNumber: 0,
      idFiliale: ''

    });

  }


  GetNotification() {


    if (this.currentUser !== null) {
      this.address = '"' + this.currentUser.Mail_Utilisateur + '"';
      this.idFiliale = this.currentUser.Filiale_Utilisateur;
    }

    return this.http.get(environment.notificationApi + '/Notification?address=' + this.address)
  }

  sendNotification() {
    if (this.currentUser !== null) {
      this.address = '"' + this.currentUser.Mail_Utilisateur + '"';
      this.idFiliale = this.currentUser.Filiale_Utilisateur;
    }


    this.dataUsersService.getlistFiliale().subscribe(res => {
      console.log(res)

      this.filiale = res as Filiale[]
    },
      err => {
        console.log(err);
      },
      () => {

        this.nom = this.filiale.find(x => x.filialeID == this.currentUser.Filiale_Utilisateur).nom
        this.form.value.idFiliale = this.nom;
        this.form.value.fromAddresses = this.currentUser.Mail_Utilisateur;
        this.form.value.posteNumber = this.currentUser.PhoneInterne;
        this.form.value.phoneNumber = this.currentUser.PhoneExterne;
        // if (this.currentUser.Role_Utilisateur == "Responsable") {
        //   this.form.value.toAddresses = 'Mourad Ben Hlayem/SIEGE/POULINA'
        // }
        this.PostForm(this.form.value)
      })

  }
  // resetForm() {

  //   this.emailMessage = {
  //     toAddresses: '',
  //     fromAddresses: '',
  //     subject: '',
  //     content: '',
  //     files: '',
  //     posteNumber: 0,
  //     phoneNumber: 0,
  //     idFiliale: '',

  //   };
  // }
  PostForm(value) {

    this.http.post(environment.notificationApi + '/Notification', value, { responseType: "text" }).subscribe(res => {

      if (res == "Mail success") {

        // this.resetForm();
        this.initializeFormGroup();
        this.form.markAsUntouched();
        this._snackBar.open(res, "X", {
          duration: 8000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["green-snackbar"]
        });


      }
      else {
        // this.resetForm();
        this.initializeFormGroup();
        this.form.markAsUntouched();

        this._snackBar.open(res, "X", {
          duration: 8000,
          verticalPosition: "top",
          horizontalPosition: "center",
          panelClass: ["red-snackbar"]
        });

      }
    },
      err => {
        console.log(err);

      }
    );
  }


  NotificationSeen(id: string) {


    return this.http.get(environment.notificationApi + '/Notification/' + id + '?address=' + this.address);
  }

  GetUsers() {
    return this.http.get(environment.gestionUtilisateurApi + '/Users')
      .toPromise()
      .then(res => (this.list = res as Users[]));
  }
  //http://192.168.160.57:5006/~user=adminsql&password=PgHSqL2009/api/Notification

  Notification() {

    this.GetNotification().subscribe(res => {
      this.emailFrom = res as EmailFrom[];

    }, err => { },
      () => {
        this.emailFrom.forEach(element => {
          this.toastr.info(
            'Objet : ' + element.subject,
            'Notification reçu de ' + element.fromName)
            .onTap
            .subscribe(() => this.NotificationSeen(element.idMail).subscribe(
              res => { }
            ));
        })

      })

  }


}

function ToAddressValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if ((control.value as string).split('/').length != 3 && control.value != '') {
    return { ToAddressValidator: true };
  }
  return null;
}
function RequiredValidator(control: AbstractControl): { [key: string]: boolean } | null {

  if (((JSON.parse(localStorage.getItem('currentUser')).Role_Utilisateur == 'Admin') || (JSON.parse(localStorage.getItem('currentUser')).Role_Utilisateur == 'SuperAdmin')) && control.value == '') {
    return { ToAddressValidator: true };
  }
  return null;
}