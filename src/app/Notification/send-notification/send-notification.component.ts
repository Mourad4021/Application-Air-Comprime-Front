import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Notification/notification.service';


@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styles: []
})
export class SendNotificationComponent implements OnInit {

  constructor(private data: NotificationService) { }

  ngOnInit() {

    this.data.GetNotification()
    this.data.GetUsers()

  }
  onSubmit() {
    this.data.sendNotification()

  }




}

