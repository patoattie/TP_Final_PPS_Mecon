import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Mesa } from '../clases/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  porcentaje: number;
  finalizado: boolean;




  constructor(private fireStore: AngularFirestore,  private storagefoto: AngularFireStorage) { }


  altaMesa(filename: string, file: any, mesa: Mesa) {

    //subi la foto
    var ref = this.storagefoto.ref('mesa/' +mesa.numero+ '/' + filename).put(file);

    ref.percentageChanges().subscribe((porcentaje) => {

      this.porcentaje = Math.round(porcentaje);

      console.log("Porcentaje:" + this.porcentaje)
      if (this.porcentaje == 100) {

        this.finalizado = true;

        setTimeout(() => this.storagefoto.ref('mesa/' +mesa.numero+ '/' + filename).getDownloadURL().subscribe((URL) => {
          var res1=this.fireStore.collection('mesas').add(mesa.numero);

          const datos = {
            numero: mesa.numero,
            comensales: mesa.comensales,
            tipo_comensales: mesa.tipo_comensales,
            foto: URL
          }
        
        
          var res=this.fireStore.collection('mesas').add(datos).then(function (docRef) {

            // Update metadata properties
            return  {
              contentType: 'image/jpeg',
              customMetadata: {
                'mesa': docRef.id,
              }
            }
          });

          res.then(meta => {
              this.storagefoto.ref('mesa/' +mesa.numero+ '/' + filename).updateMetadata(meta);
              console.log('meta ok')
             })
              .catch(function (error) {
              // Uh-oh, an error occurred!
              alert('error meta');
            });
 
        }), 3000);
      }
    });

  }

  traerUnaMesa(uid) {
    return this.fireStore.collection('mesas').doc(uid).valueChanges();
  }

  traerTodasMesas() {
    return this.fireStore.collection('mesas').snapshotChanges();
  }


}
