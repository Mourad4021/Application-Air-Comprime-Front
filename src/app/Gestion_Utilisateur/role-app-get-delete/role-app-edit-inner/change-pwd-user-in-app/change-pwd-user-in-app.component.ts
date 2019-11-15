import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppRoleDataService } from 'src/app/Shared/Gestion-Utilisateur/AppRole/app-role-data.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-change-pwd-user-in-app',
  templateUrl: './change-pwd-user-in-app.component.html',
  styles: []
})
export class ChangePwdUserInAppComponent implements OnInit {

  constructor(private fb:FormBuilder,private roleAppDataservice:AppRoleDataService,private matDialog:MatDialog) { }
  
  ngOnInit() {
  }
  onPost()
  {
    this.roleAppDataservice.putChangePasswordOfUserInApplication().subscribe(
      res=>{
        this.matDialog.closeAll();
      }
    )
  }
}
