import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { FormBuilder, Validators, FormArray } from "@angular/forms";
import { Application } from "./models/application.model";
import { Role } from "./models/role.model";
import { AppRoleMenu } from "./models/appRoleMenu.model";

@Injectable({
  providedIn: "root"
})
export class AppRoleDataService {
  applicationList: Application[] = new Array();
  listOfAppRoleMenu: AppRoleMenu[] = Array();

  roleList: Role[] = new Array();

  changePasswordForm = this.fb.group({
    userId: [""],
    appId: [""],
    roleId: [""],
    password: []
  });
  AddAppRoleToUserForm = this.fb.group({
    appId: ["", [Validators.required]],
    roleId: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  selectedUserID: string;
  selectedUserName: string;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {}

  //role
  getRoles() {
    return this.httpClient.get(
      environment.authentificationPghApi + "/Role/List"
    );
  }

  postRoleToUserMenu() {
    return this.httpClient.post(
      environment.authentificationPghApi + "/roles/Users-Menus",
      [
        {
          "User ID": this.selectedUserID,
          "Menu ID": environment.ApplicationMenuId,
          "Role ID": this.AddAppRoleToUserForm.controls.roleId.value
        }
      ]
    );
  }
  putRoleToUserMenu(oldRoleId: string, roleId: string, userId: string) {
    return this.httpClient.put(
      environment.authentificationPghApi +
        "/roles/Users-Menus?RoleId=" +
        oldRoleId,
      {
        "User ID": userId,
        "Menu ID": environment.ApplicationMenuId,
        "Role ID": roleId
      }
    );
  }

  //get Role associated to user Menu

  getRoleAssociatedToUserMenu() {
    //?UserId='+userId+'&
    //http://localhost:4716/api/roles/Users-Menus?UserId=514d33af-f0a1-4a1e-8ab5-6601b1d1b497&MenuId=84ed99e3-d844-4bf9-8105-6c938303d6f3
    return this.httpClient.get(
      environment.authentificationPghApi +
        "/roles/Users-Menus?MenuId=" +
        environment.ApplicationMenuId
    );
  }
  //Application
  getApplications() {
    return this.httpClient.get(
      environment.authentificationPghApi + "/Applications/GetList"
    );
  }
  getAppwithUsers(appId: string) {
    return this.httpClient.get(
      environment.authentificationPghApi + "/Applications/" + appId + "/Users"
    );
  }

  postApplicationToUser() {
    return this.httpClient.post(
      environment.authentificationPghApi +
        "/Applications/" +
        this.AddAppRoleToUserForm.controls.appId.value +
        "/Users",
      [
        {
          "User ID": this.selectedUserID,
          "User Password": this.AddAppRoleToUserForm.controls.password.value
        }
      ]
    );
  }
  putChangePasswordOfUserInApplication() {
    return this.httpClient.put(
      environment.authentificationPghApi +
        "/Applications/" +
        this.changePasswordForm.controls.appId.value +
        "/Users",
      [
        {
          "User ID": this.changePasswordForm.controls.userId.value,
          "User Password": this.changePasswordForm.controls.password.value
        }
      ]
    );
  }
}
