import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class FcmService {
  backend: any;
  perfil: string;

  constructor(
    public fcm: FCM,
    platform: Platform,
    toastCtrl: ToastController,
    public afs: AngularFirestore,
    public servicioAuth: AuthService) 
    { }

 


  ngOnInit() {
    console.log("sin perfil", this.servicioAuth.usuarioLoguiado.perfil);
    this.perfil= this.servicioAuth.usuarioLoguiado.perfil;
   
  }

  getToken() {
    return this.fcm.getToken().then(token => {
      this.guardarTokenEnFirestore(token);
      //this.backend.registerToken(token);
      //this.afs.collection('local').add({usuario: this.perfil});
      console.log(token);
    });
  }

  guardarTokenEnFirestore(token) {
    if (!token) return;
    const devicesRef = this.afs.collection('devices');
    const docData = {
      token,
      userId: this.servicioAuth.getCurrentUserMail().toString(),
    }
    return devicesRef.doc(token).set(docData).then(()=> {
      console.log("ok registro device");
      swal("Suscripción Existosa!", "Click para continuar", "success");
    }
   )
  }

  registrarIngresoLocal(){
    this.afs.collection('local').add({usuario: this.servicioAuth.getCurrentUserMail().toString()}).then(()=> {
      swal("Ingreson Existoso!", "Click para continuar", "success");
    });
  }

  ComprobarNotificationes() {
    return this.fcm.onNotification();
  }




}
