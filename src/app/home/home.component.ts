import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../Shared/Notification/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private notificationService:NotificationService) { }

  ngOnInit() {
   this.notificationService.Notification(); 
  }

}
