import { Injectable, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
//import { File } from "@ionic-native/file/ngx";

import { Observable } from 'rxjs';
import { Producto } from 'src/app/clases/producto';
import { ABlobService } from '../a-blob.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  porcentaje: number;
  finalizado: boolean;
  ref:any[];

  constructor(
    private storage: AngularFireStorage,
    private fireStore: AngularFirestore,
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



  
}