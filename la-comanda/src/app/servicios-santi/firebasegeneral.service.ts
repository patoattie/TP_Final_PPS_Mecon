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

  async altaProducto(Producto:Producto, Files:File[]){
    
      this.filestorage.subir(Files,Producto)
      .then(()=>console.log(Producto));
  }

  getAllproducto(){
    return this._angularFirestore.collection("producto")
      .valueChanges();

  }
}
