import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../clases/producto';
import { FirebasegeneralService } from '../servicios-santi/firebasegeneral.service';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { ModalProductoPage } from '../modal-producto/modal-producto.page'
import { Pedido } from '../clases/pedido';
@Component({
  selector: 'app-modal-listado-productos-pedido',
  templateUrl: './modal-listado-productos-pedido.page.html',
  styleUrls: ['./modal-listado-productos-pedido.page.scss'],
})
export class ModalListadoProductosPedidoPage implements OnInit {
  @Input() Pedido:Pedido;
  productosLista:Observable<any[]>;
  @Output() emisor:EventEmitter<Producto>;
  constructor(private firebaseServicios:FirebasegeneralService,
              private router:Router,
              navParams: NavParams,
              public modalController: ModalController) {
    this.productosLista=this.firebaseServicios.getAllproducto();
    this.Pedido=navParams.get("pedidos");
    this.emisor=new EventEmitter<Producto>();
   }

  ngOnInit() {
  }
  async click(producto){
   
      
      
    
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true

    });
  }
    agregar(producto){
      console.log(producto);
      if(this.Pedido.producto.includes(producto)){
        this.Pedido.producto[this.Pedido.producto.indexOf(producto)].cantidad++;
      }else{
        producto++;
        this.Pedido.producto.push(producto);
        console.log("entro esta poronga");
        console.log(this.Pedido);
      }
    }
    sacar(producto:Producto){
      console.log(producto);
      if(this.Pedido.producto.includes(producto)){
        if(this.Pedido.producto[this.Pedido.producto.indexOf(producto)].cantidad==1){
          this.Pedido.producto.splice(this.Pedido.producto.indexOf(producto),1);
          producto.cantidad--;
        }else{
          producto.cantidad--;
          console.log(this.Pedido.producto[this.Pedido.producto.indexOf(producto)]);
        }
        
      }
    }

  
}
