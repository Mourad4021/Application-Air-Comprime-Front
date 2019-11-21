import { Injectable } from "@angular/core";
import { Users } from "./users.model";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Filiale } from "../Filiale/filiale.model";
import { environment } from "src/environments/environment";
import { NgbPaginationNumber } from "@ng-bootstrap/ng-bootstrap";

@Injectable({
  providedIn: "root"
})
export class DataUsersService {
  // rootUrl: "http://localhost:49211/api";
  list: Users[];
  listFiliale: Filiale[];
  Users: Users;
  form: FormGroup = new FormGroup({
    usersId: new FormControl(""),
    usersCode: new FormControl("", [Validators.required, Validators.min(0), Validators.max(99999999)]),
    usersName: new FormControl("", Validators.required),
    usersLastName: new FormControl("", [Validators.required]),
    usersState: new FormControl("", [Validators.required]),
    usersMail: new FormControl("", [Validators.required]),

    usersMailIntern: new FormControl("", [
      Validators.required,
      InternMailValidator
    ]),
    usersPosteName: new FormControl("", [Validators.required]),
    usersPhoneNumber: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    usersPersonalNumber: new FormControl("", [
      Validators.required,
      Validators.pattern(/^-?(0|[0-9]\d*)?$/)
    ]),
    usersGenderCode: new FormControl("", [Validators.required]),
    usersBirthDate: new FormControl("", [Validators.required]),
    usersJoinDate: new FormControl("", [Validators.required]),

    usersDateLeave: new FormControl(""),
    filialeID: new FormControl("")
  });

  constructor(private http: HttpClient) { }

  getUsers() {
    this.http
      .get(environment.gestionUtilisateurApi + "/Users")
      .toPromise()
      .then(res => (this.list = res as Users[]));
  }

  DeleteUsers(usersId) {
    return this.http.delete(
      environment.gestionUtilisateurApi + "/Users/" + usersId,
      { responseType: "text" }
    );
  }

  putUsers() {
    return this.http.put(
      environment.gestionUtilisateurApi +
      "/Users/" +
      this.form.controls.usersId.value,
      this.form.value,
      { responseType: "text" }
    );
  }

  insertUsers() {
    return this.http.post(
      environment.gestionUtilisateurApi + "/Users",
      this.form.value,
      { responseType: "text" }
    );
  }

  initializeFormGroup() {
    this.form.setValue({
      usersId: "00000000-0000-0000-0000-000000000000",
      usersCode: "",
      usersName: "",
      usersLastName: "",
      usersState: "",
      usersMail: "",
      usersMailIntern: "",
      usersPosteName: "",
      usersPhoneNumber: "",
      usersPersonalNumber: "",
      usersGenderCode: "",
      usersBirthDate: "",
      usersJoinDate: "",
      usersDateLeave: new Date("1300-01-01"),
      filialeID: ""
    });
  }

  initializeFormGroupForEdit(cons: Users) {
    this.form.setValue({
      usersId: cons.usersId,
      usersCode: cons.usersCode,
      usersName: cons.usersName,
      usersLastName: cons.usersName,
      usersState: cons.usersState,
      usersMail: cons.usersMail,
      usersMailIntern: cons.usersMailIntern,
      usersPosteName: cons.usersPosteName,
      usersPhoneNumber: cons.usersPhoneNumber,
      usersPersonalNumber: cons.usersPersonalNumber,
      usersGenderCode: cons.usersGenderCode,
      usersBirthDate: cons.usersBirthDate,
      usersJoinDate: cons.usersJoinDate,
      usersDateLeave: cons.usersDateLeave,
      filialeID: cons.filialeID
    });
  }

  getlistFiliale() {
    return this.http.get(environment.gestionUtilisateurApi + "/Filiale");
  }
}
function InternMailValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  //  && (control.value as string).split('/')[1] != 'SIEGE'
  if ((control.value as string).split("/").length != 3) {
    return { InternMailValidator: true };
  }
  return null;
}
