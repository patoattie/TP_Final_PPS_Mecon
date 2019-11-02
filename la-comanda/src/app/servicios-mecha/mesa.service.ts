import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Mesa } from '../clases/mesa';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  porcentaje: number;
  finalizado: boolean;
  mesas: Mesa[];
  spinner:boolean;




  constructor(private fireStore: AngularFirestore, private storagefoto: AngularFireStorage) { }


  altaMesa(filename: string, file: any, mesa: Mesa) {
    this.spinner = true;
    //subi la foto
    var ref = this.storagefoto.ref('mesa/' + mesa.numero + '/' + filename).put(file);

    ref.percentageChanges().subscribe((porcentaje) => {

      this.porcentaje = Math.round(porcentaje);

      console.log("Porcentaje:" + this.porcentaje)
      if (this.porcentaje == 100) {

        this.finalizado = true;

        setTimeout(() => this.storagefoto.ref('mesa/' + mesa.numero + '/' + filename).getDownloadURL().subscribe((URL) => {


          const datos = {
            numero: mesa.numero,
            comensales: mesa.comensales,
            tipo_comensales: mesa.tipo_comensales,
            foto: URL,
            baja: false
          }


          /* var res=this.fireStore.collection('mesas').add(datos).then(function (docRef) {
 
             // Update metadata properties
             return  {
               contentType: 'image/jpeg',
               customMetadata: {
                 'mesa': docRef.id,
               }
             }
           });
           */

          var res = this.fireStore.collection('mesas').doc('mesa_' + mesa.numero).set(datos).then(() => {
            // codigo para usar luego para la carga de la foto de la mesa  var res=this.fireStore.collection('mesas').doc('mesa_'+mesa.numero).collection('registro').add(datos)
            // Update metadata properties
            return {
              contentType: 'image/jpeg',
              customMetadata: {
                'mesa': mesa.numero.toLocaleString(),
              }
            }
          });

          res.then(meta => {
            this.storagefoto.ref('mesa/' + mesa.numero + '/' + filename).updateMetadata(meta);
            console.log('meta ok');
            this.spinner = false;
          })
            .catch(function (error) {
              // Uh-oh, an error occurred!
              alert('error meta');
            });

        }), 3000);
      }
    });

  }




  traerUnaMesa(uid:string): any {
    console.log(uid);
    return this.fireStore.collection('mesas').doc(uid).valueChanges();
    }

  traerTodasMesas() {
    let mesas = this.fireStore.collection('mesas').snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return mesas;

  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }


  modificarMesa(mesa: Mesa) {    
    const datos = {
      tipo_comensales: mesa.tipo_comensales
    }
   this.fireStore.collection('mesas').doc('mesa_' + mesa.numero).update(datos).then(() =>  this.spinner = false);
  }

 bajaMesa(mesa: Mesa) {    
  this.spinner = true;
    const datos = {
      baja: mesa.baja,
      motivo: mesa.motivo
    }
   this.fireStore.collection('mesas').doc('mesa_' + mesa.numero).update(datos).then(() =>   this.spinner = false);
  }

  showLoadingSpinner(mesa: Mesa) {
    return mesa.spin = true;
  }

  hideLoadingSpinner(mesa: Mesa) {
    return mesa.spin = false;

  }


}
