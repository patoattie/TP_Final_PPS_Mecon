import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Usuario } from '../clases/usuario';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  porcentaje: number;
  finalizado: boolean;
  usuarios: Usuario[];
  spinner:boolean;




  constructor(private fireStore: AngularFirestore, private storagefoto: AngularFireStorage) { }


  altaUsuario(filename: string, file: any, usuario: Usuario) {
    this.spinner = true;
    //subi la foto
    var ref = this.storagefoto.ref('usuario/' + usuario.numero + '/' + filename).put(file);

    ref.percentageChanges().subscribe((porcentaje) => {

      this.porcentaje = Math.round(porcentaje);

      console.log("Porcentaje:" + this.porcentaje)
      if (this.porcentaje == 100) {

        this.finalizado = true;

        setTimeout(() => this.storagefoto.ref('usuario/' + usuario.numero + '/' + filename).getDownloadURL().subscribe((URL) => {


          const datos = {
            numero: usuario.numero,
            comensales: usuario.comensales,
            tipo_comensales: usuario.tipo_comensales,
            foto: URL,
            baja: false
          }


          /* var res=this.fireStore.collection('usuarios').add(datos).then(function (docRef) {
 
             // Update metadata properties
             return  {
               contentType: 'image/jpeg',
               customMetadata: {
                 'usuario': docRef.id,
               }
             }
           });
           */

          var res = this.fireStore.collection('usuarios').doc('usuario_' + usuario.numero).set(datos).then(() => {
            // codigo para usar luego para la carga de la foto de la usuario  var res=this.fireStore.collection('usuarios').doc('usuario_'+usuario.numero).collection('registro').add(datos)
            // Update metadata properties
            return {
              contentType: 'image/jpeg',
              customMetadata: {
                'usuario': usuario.numero.toLocaleString(),
              }
            }
          });

          res.then(meta => {
            this.storagefoto.ref('usuario/' + usuario.numero + '/' + filename).updateMetadata(meta);
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




  traerUnaUsuario(uid:string): any {
    console.log(uid);
    return this.fireStore.collection('usuarios').doc(uid).valueChanges();
    }

  traerTodasUsuarios() {
    let usuarios = this.fireStore.collection('usuarios').snapshotChanges()
      .pipe(map(actions => actions.map(this.documentToDomainObject)));
    return usuarios;

  }

  documentToDomainObject = _ => {
    const object = _.payload.doc.data();
    object.id = _.payload.doc.id;
    return object;
  }


  modificarUsuario(usuario: Usuario) {    
    const datos = {
     motivo: usuario.tipo_comensales
    }
   this.fireStore.collection('usuarios').doc('usuario_' + usuario.numero).update(datos).then(() => console.log("hola"));
  }

 bajaUsuario(usuario: Usuario) {    
    const datos = {
      baja: usuario.baja,
      motivo: usuario.motivo
    }
   this.fireStore.collection('usuarios').doc('usuario_' + usuario.numero).update(datos).then(() => console.log("hola"));
  }

  showLoadingSpinner(usuario: Usuario) {
    return usuario.spin = true;
  }

  hideLoadingSpinner(usuario: Usuario) {
    return usuario.spin = false;

  }


}
