import { Component, OnInit } from '@angular/core';
import { Mesa } from '../clases/mesa';
import { Vibration } from '@ionic-native/vibration/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirebasegeneralService } from '../servicios-santi/firebasegeneral.service';
import { MesaService } from '../servicios-mecha/mesa.service';
import { ModalController } from '@ionic/angular';
import { ModalListadoProductosPedidoPage } from '../modal-listado-productos-pedido/modal-listado-productos-pedido.page';
import { Pedido } from '../clases/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  mesa: Mesa = new Mesa();
  parse: any;
  mensaje: string = " ";
  private enEspera: boolean;
  pedidos:Pedido=new Pedido();
  escaneo:boolean=false;
  listoParaPedir:boolean=false;

  constructor(
    private vibration: Vibration,
    private barcodeScanner: BarcodeScanner,
    private firebaseSanti:FirebasegeneralService,
    private mesafire:MesaService,
    private modalController:ModalController
    ) { 

    }

  ngOnInit() {
  }
  scanQr() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.parse = JSON.parse(barcodeData.text);
      this.mesa.numero = this.parse.numero;
      this.mesa.comensales = this.parse.comensales;
      this.mesa.tipo_comensales = this.parse.tipo_comensales;
      this.escaneo=true;
      if(this.mesa.numero!=0){
        console.log("aca por lo menos?");
        this.pedidos.mesa=this.mesa.numero;
        this.pedidos.estado="esperaMesa";
        this.firebaseSanti.empiezaPedido(this.pedidos);
        this.listoParaPedir=true;
      }
    }).catch(err => {
      this.mensaje = 'Error carga código Qr';
      this.vibration.vibrate(1000);
    });
  }

  public getEnEspera(): boolean {
    return this.enEspera;
  }

  async agregarProducto(){
      
      const modal = await this.modalController.create({
        component: ModalListadoProductosPedidoPage,
        componentProps:{
          "pedidos":this.pedidos
        },
      });
      return await modal.present();
  }





}



