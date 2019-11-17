import { Component, OnInit } from '@angular/core';
import { FcmService } from '../servicios-mecha/fcm.service';
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  backend: any;

  constructor(
    private fcm: FcmService) { }

  ngOnInit() {
    this.fcm.getToken().then(token => {
      this.fcm.guardarTokenEnFirestore(token);
      //this.backend.registerToken(token);
      console.log(token);
    });

    this.fcm.ComprobarNotificationes() ;

  }

  
}
