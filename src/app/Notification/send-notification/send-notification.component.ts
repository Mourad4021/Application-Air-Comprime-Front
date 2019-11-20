import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Notification/notification.service';
import { AuthenticationService } from 'src/app/Shared/AuthenticationService/authentication.service';
import { AppRoleDataService } from 'src/app/Shared/Gestion-Utilisateur/AppRole/app-role-data.service';
import { Role } from 'src/app/Shared/Gestion-Utilisateur/AppRole/models/role.model';



@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styles: []
})
export class SendNotificationComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private data: NotificationService, private authService: AuthenticationService, private roleAppDataService: AppRoleDataService) { }
  AdminRoleId: string;
  a = "";
  ngOnInit() {


    this.roleAppDataService.getRoles().subscribe(

      res => {

        this.roleAppDataService.roleList = res as Role[]
        this.AdminRoleId = this.roleAppDataService.roleList.find(x => x.RoleName == "TotalControl").RoleID;



      }
    )
    this.roleAppDataService.getRoleAssociatedToUserMenu().subscribe(
      res => {

        (res as any[]).forEach(element => {
          this.roleAppDataService.listOfAppRoleMenu.push({ RoleId: element.role["RoleID"], UserId: element.user["UserID"], appId: element.menus['Application ID'] })


        });


        console.log(this.roleAppDataService.listOfAppRoleMenu);

      }
    )

    this.data.GetNotification()
    this.data.GetUsers()


  }
  GetUserAdmin() {

    let userId = this.roleAppDataService.listOfAppRoleMenu.find(x => x.RoleId == this.AdminRoleId).UserId
    let UserLotus = this.data.list.find(x => x.usersId == userId).usersMailIntern;
    return UserLotus;
  }



  onSubmit() {
    debugger
    if (this.currentUser.Role_Utilisateur == "Responsable") {
      this.data.form.value.toAddresses = this.GetUserAdmin();
    }
    this.data.sendNotification()

  }

}