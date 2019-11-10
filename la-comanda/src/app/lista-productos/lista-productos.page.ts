import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Producto } from '../clases/producto';
import { FirebasegeneralService } from '../servicios-santi/firebasegeneral.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalProductoPage } from '../modal-producto/modal-producto.page'
@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
  productosLista:Observable<any[]>;
  @Output() emisor:EventEmitter<Producto>;
  constructor(private firebaseServicios:FirebasegeneralService,
              private router:Router,
              public modalController: ModalController) {
    this.productosLista=this.firebaseServicios.getAllproducto();
   
    this.emisor=new EventEmitter<Producto>();
   }

  ngOnInit() {
  }
  async click(producto){
   
      const modal = await this.modalController.create({
        component: ModalProductoPage,
        componentProps:{'producto':producto}
      });
      return await modal.present();
    
    
  }
  
}
