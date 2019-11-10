import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../clases/producto';
import { NavParams, ModalController } from '@ionic/angular';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgModel } from "@angular/forms";
import { FirebasegeneralService } from '../servicios-santi/firebasegeneral.service';
@Component({
  selector: 'modal-producto',
  templateUrl: './modal-producto.page.html',
  styleUrls: ['./modal-producto.page.scss']
})
export class ModalProductoPage implements OnInit {
  @Input() nuevoProducto:Producto;
  constructor(navParams: NavParams,
              private modalCtrl:ModalController,
              private servicioFirebase:FirebasegeneralService) {
    console.log(navParams.get("producto"));
    this.nuevoProducto=navParams.get("producto");
   }

  ngOnInit() {
  }
  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  Modificar(){
    this.nuevoProducto.tiempo_elaboracion_real=this.nuevoProducto.tiempo_elaboracion.substring(11,16);
    console.log(this.nuevoProducto);

    this.servicioFirebase.altaProducto(this.nuevoProducto);

  }
  Baja(){
  
    this.nuevoProducto.motivo_baja="baja";
    console.log(this.nuevoProducto);
    this.servicioFirebase.altaProducto(this.nuevoProducto);

  }
}
