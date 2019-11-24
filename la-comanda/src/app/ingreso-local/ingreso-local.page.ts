import { Component, OnInit } from '@angular/core';
import { FcmService } from '../servicios-mecha/fcm.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { MesaService } from '../servicios-mecha/mesa.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import swal from 'sweetalert';
import { AuthService } from '../servicios-mecha/auth.service';
import { UsuarioService } from '../servicios-mecha/usuario.service';

@Component({
  selector: 'app-ingreso-local',
  templateUrl: './ingreso-local.page.html',
  styleUrls: ['./ingreso-local.page.scss'],
})
export class IngresoLocalPage implements OnInit {
  parse: any;
  local = 1;

  constructor(public servicioAuth: AuthService, public usuarioservicio: UsuarioService,private fcm: FcmService, private vibration: Vibration, public mesaServicio: MesaService, private barcodeScanner: BarcodeScanner) { }




  ngOnInit() {
    this.scanQr();
    console.log("sin perfil", this.servicioAuth.usuarioLoguiado.perfil);  
   
  }
 


  scanQr() {
    this.barcodeScanner.scan().then(barcodeData => {

      this.parse = JSON.parse(barcodeData.text);
     
      if(this.local == this.parse.local){
        this.usuarioservicio.agregarUsuarioPendientes(this.servicioAuth.usuarioLoguiado);
        this.fcm.registrarIngresoLocal();

      }
      
    }).catch(err => {
     

      this.vibration.vibrate(1000);
    });
  }

}
