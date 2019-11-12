import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  backend: any;

  constructor(private fcm: FCM) { }

  ngOnInit() {
    this.fcm.getToken().then(token => {
      this.backend.registerToken(token);
      console.log(token);
    });
  }

}
