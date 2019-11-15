import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  currentUserRole: string;
  currentUserFiliale: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    if (JSON.parse(localStorage.getItem('currentUser')) != null) {
      this.currentUserRole = JSON.parse(localStorage.getItem('currentUser')).Role_Utilisateur
    }
    if (JSON.parse(localStorage.getItem('currentUser')) != null) {
      this.currentUserFiliale = JSON.parse(localStorage.getItem('currentUser')).Filiale_Utilisateur
    }
  }

  public getcurrentUserFiliale() {
    return this.currentUserFiliale;
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public get getJwtToken() {
    return this.currentUserSubject.value.Token_Attribute.value;
  }


  // form: FormGroup = new FormGroup({   
  //   userCode: new FormControl('', Validators.required),
  //     appCode: new FormControl('', Validators.required),
  //     userPassword: new FormControl('', Validators.required),
  // });

  login(username, application, password) {

    //return this.http.get('http://localhost:4716/api/Login?userCode='+username+'&appCode='+application+'&userPassword='+password)
    //return this.http.get('http://localhost:4716/api/Login/'+this.logi)
    //return this.http.get('http://localhost:4716/api/Login'+({userCode:username,appCode:application,userPassword:password}))
    return this.http.get(environment.authentificationPghApi + '/Login?userCode=' + username + '&appCode=' + application + '&userPassword=' + password)
      .pipe(map(user => {
        //Responsable/Admin,SuperAdmin
        localStorage.setItem('currentUser', JSON.stringify(user));
        //localStorage.setItem('currentUser','{"Token_Attribute":{"validTo":"2019-10-12T12:18:53Z","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBdGhpbCBCZWxoYWRqIiwianRpIjoiMDBlYjQ1MDAtMDI0Yi00NzVlLWFlNWEtZDZhM2YyN2E2NGQwIiwiTWVtYmVyc2hpcElkIjoiMDAwMDAwMDQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJMaW1pdGVkQWNjZXNzIiwiZXhwIjoxNTcwODgyNzMzLCJpc3MiOiJQb3VsaW5hLlNlY3VyaXR5LkJlYXJlciIsImF1ZCI6IlBvdWxpbmEuU2VjdXJpdHkuQmVhcmVyIn0.SyFNbTrZ4M7bAdnACqlnINLEcXHAxv6pL1sGWactJXc"},"Filiale_Utilisateur":null,"Nom_Utilisateur":"Belhadj Athil","Mail_Utilisateur":"SupAdmin@poulina.com","Code_Utilisateur":"00000004","Nom_Application":"Gestion de laboratoire Dick","Code_Application":"0001","Liste_des_permissions":[],"Role_Utilisateur":"Admin"}' );
        this.currentUserSubject.next(user);
        this.currentUserRole = JSON.parse(localStorage.getItem('currentUser')).Role_Utilisateur
        return user;
      }));

    // console.log(result);

    // return result;

    // return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
    //     .pipe(map(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         this.currentUserSubject.next(user);
    //         return user;
    //     }));

  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}