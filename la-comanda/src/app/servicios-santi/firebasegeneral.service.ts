import { Injectable } from '@angular/core';
import { FotoService } from './firebase/foto-service.service';
import { Producto } from '../clases/producto';
import { AngularFirestore } from '@angular/fire/firestore';
//import { File } from "@ionic-native/file/ngx";


@Injectable({
  providedIn: 'root'
})
export class FirebasegeneralService {

  constructor(private filestorage:FotoService,
    private _angularFirestore:AngularFirestore,
    ) { 


  }

  async altaProducto(Producto:Producto, Files?:File[]){
      if(Files){
      this.filestorage.subir(Files,Producto)
      .then(()=>console.log(Producto));}
      else{
        console.log("Entro a esta");
        
        this._angularFirestore.collection('producto').doc(Producto.nombre).set(Producto);
      }
  }

 

  getAllproducto(){
    return this._angularFirestore.collection("producto",  ref => ref.where("motivo_baja","==",""))
      .valueChanges();

  }
  empiezaPedido(pedido){
    console.log("aca tambien");
    this.filestorage.empiezaPedido(pedido);
  }
}
