import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public estaloguiado: any = false;

  constructor(private angularFireAuth:AngularFireAuth, private db: AngularFirestore, private route: Router) {
    angularFireAuth.authState.subscribe(Usuario => (this.estaloguiado = Usuario));
   }

 
   login(usuario:Usuario):Promise<any>{
     return this.angularFireAuth.auth.signInWithEmailAndPassword(
      usuario.email,usuario.clave);
   }
   getCurrentUserId(): string {
    return this.angularFireAuth.auth.currentUser ? this.angularFireAuth.auth.currentUser.uid : null;
  }

  getCurrentUserMail(): string {
    return this.angularFireAuth.auth.currentUser.email;
  }

   // Sign up with email/password
   async SignUp(usuario:Usuario) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.clave)
      .then((result) => {
        console.log("Se registró con éxito");
        this.route.navigate(['login']);
        console.log(result.user)
      }).catch((error) => {
        console.log(error.message)
      })
  }

  SignOut(){this.angularFireAuth.auth.signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
} 
}