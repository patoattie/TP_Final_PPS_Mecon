import { Component, OnInit } from '@angular/core';
import { FcmService } from '../servicios-mecha/fcm.service';

@Component({
  selector: 'app-ingreso-local',
  templateUrl: './ingreso-local.page.html',
  styleUrls: ['./ingreso-local.page.scss'],
})
export class IngresoLocalPage implements OnInit {

  constructor(private fcm: FcmService) { }

  ngOnInit() {

    this.fcm.registrarIngresoLocal();
  }

}
