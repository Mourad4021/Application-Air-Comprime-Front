import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";


import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { AppRoleDataService } from 'src/app/Shared/Gestion-Utilisateur/AppRole/app-role-data.service';
import { Application } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/application.model';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';

@Component({
  selector: "app-login-boxed",
  templateUrl: "./login-boxed.component.html",
  styles: []
})
export class LoginBoxedComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public data: AuthenticationService,
     private appRoleDataService:AppRoleDataService
  ) {
    if (this.data.currentUserValue) {
      this.router.navigate([this.returnUrl]);
    }
  }

  groupes: object;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errorObj: object;
  errorMsg: string;

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.data
      .login(
        this.f.username.value,
        this.f.application.value,
        this.f.password.value
      )
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.errorObj = error;
          this.errorMsg = error.error;
          console.log(this.errorMsg);
          console.log(this.errorObj);
          this.loading = false;
        }
      );

    this.router.navigate([this.returnUrl]);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      application: ['', Validators.required],
      password: ['', Validators.required]
    });


    this.appRoleDataService.getApplications().subscribe(
      res=>{
        this.appRoleDataService.applicationList=res as Application[]
      }
    )
   
  }
}
