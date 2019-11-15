import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NotificationService } from 'src/app/Shared/Notification/notification.service';
import { ToastrService } from 'ngx-toastr';
import { EmailFrom } from 'src/app/Shared/Notification/email-from.model';



@Component({
  selector: 'app-recieve-notification',
  templateUrl: './recieve-notification.component.html',
  styles: []
})
export class RecieveNotificationComponent implements OnInit{
 
  Name :string="";
  sub:string="";
id:string;
  constructor(private data:NotificationService
    ,private toastr: ToastrService) { }
    
  
  ngOnInit() {


    
    // this.data.GetNotification().subscribe(res=>
    // {
    //    this.data.emailFrom=res as EmailFrom[];
 
    // },err=>{},
    // ()=>{ 
    //   this.data.emailFrom.forEach(element=>{
        
    //     // console.log(this.id)
    //     this.toastr.info('Objet : '+ element.subject, 'Notification reçu de '+ element.fromName).onTap
    //     .subscribe(() =>   this.data.NotificationSeen(element.idMail).subscribe(
    //       res=>{}
    //     ));
    //   })
    // })
  


  } 

}




