import { Injectable, Input, Output, EventEmitter, ɵConsole } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
//import { File } from "@ionic-native/file/ngx";

import { Observable } from 'rxjs';
import { Producto } from 'src/app/clases/producto';
import { ABlobService } from '../a-blob.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Pedido } from 'src/app/clases/pedido';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  porcentaje: number;
  finalizado: boolean;
  ref:any[];
  spinner :boolean;
  constructor(
    private storage: AngularFireStorage,
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private aBlob:ABlobService
    
  ) {

  }

  //var file = campoArchivo.get(0).files[0];
 async subir(Files:File[],producto:Producto) {
  this.ref=[];

   Files.forEach((file,index)=>{
   
      if("start" in file ){
        this.aBlob.formatoBlob(file).then((archivo:any)=>{        
          this.ref.push(this.storage
          .ref("producto" + '/' + "yo" + '_' + producto.nombre + index)
          .put(archivo.imgBlob));
          
          setTimeout(() => {
          
          this.ref[index].percentageChanges().subscribe((porcentaje) => {
              this.porcentaje = Math.round(porcentaje);
              console.log("Porcentaje:" + this.porcentaje)
          
              if (this.porcentaje == 100) {
                this.finalizado = true;
                this.fireStore.collection('producto').doc(producto.nombre).set(producto);
                setTimeout(() => this.storage
                  .ref("producto" + '/' + "yo" + '_' + producto.nombre + index)
                  .getDownloadURL().subscribe((URL) => {
                  console.log(URL);
                  producto.URL.push(URL);

                  }), 4000);
              }
            });
          },2000);
        });
      }else{
        this.ref.push(this.storage
          .ref("producto" + '/' + "yo" + '_' + producto.nombre + index)
          .put(file));
          console.log("llego");
          setTimeout(() => {
          
          this.ref[index].percentageChanges().subscribe((porcentaje) => {
              this.porcentaje = Math.round(porcentaje);
              console.log("Porcentaje:" + this.porcentaje)
          
              if (this.porcentaje == 100) {
                this.finalizado = true;
                this.fireStore.collection('producto').doc(producto.nombre).set(producto);
                setTimeout(() => this.storage
                  .ref("producto" + '/' + "yo" + '_' + producto.nombre + index)
                  .getDownloadURL().subscribe((URL) => {
                    console.log(URL);
                    producto.URL.push(URL);
                  }), 4000);
              }
            });
          },2000);
      }
    });


    setTimeout(()=>this.fireStore.collection('producto').doc(producto.nombre).set(producto),8000);
  }

  empiezaPedido(pedido:Pedido){
    /*this.fireStore.collection('pedidos', ref => ref.orderBy("id","desc"))
    .snapshotChanges().subscribe((id)=>{*/
      this.spinner = true;
      this.getLastFromList().then((ultimo)=>{
        let id:number;
        ultimo.forEach(e=>{
            
            id=(e[0].id)+1;
            pedido.id=id;
            console.log(pedido);
            })
            pedido.user=this.fireAuth.auth.currentUser.uid;
            
        setTimeout(()=>
                  this.fireStore.collection('pedidos').add({
                                                            "user":pedido.user,
                                                            "id":pedido.id,
                                                            "estado":pedido.estado,
                                                            "mesa":pedido.mesa,
                                                            "productos[]":pedido.producto}
        ).then((r)=>{console.log(pedido);
                      console.log("mando y entro");
                      r.collection("productos").add(pedido.producto).then(()=>this.spinner = false);

        }),2000);
   // });
    });
  }


  async getLastFromList() {
    
    let mesas= this.fireStore.collection('pedidos', ref=>ref
    .orderBy('id', 'desc').limit(1)
    ).snapshotChanges().pipe(map(actions => actions.map(this.documentToDomainObject)));
    return mesas;
    

  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    
    return object;
  }
}