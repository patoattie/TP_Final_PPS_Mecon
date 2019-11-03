import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public estaloguiado: any = false;
  public usuarioLoguiado: Usuario
  usuarios: any[];
  spinner: boolean;

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFirestore, private route: Router, private usuarioServicio: UsuarioService) {
    angularFireAuth.authState.subscribe(Usuarioauth => (this.estaloguiado = Usuarioauth));

    this.usuarioServicio.traerTodasUsuarios()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        // console.log(this.usuarios[0].numero);
      });

  }

  Ingresar(usuario: Usuario) {
    this.spinner = true;
    this.usuarioLoguiado = new Usuario();
    this.login(usuario).then(() => {
      setTimeout(() => {
        this.usuarioServicio.buscarUsuarioPorEmail(usuario.email).subscribe(usuarios => {
          this.usuarioLoguiado = usuarios[0];
          this.spinner = false;
          console.log(this.usuarioLoguiado.perfil);
          if( this.usuarioLoguiado == undefined){            
            swal("Error", "Usuario no encontrado", "error");
          } else 
          {
            return true;
          }
                 
        })
      }, 1500);
    });

   

    if (this.usuarioLoguiado.dni != undefined) {
      this.spinner = false;
      return false
    } else {
      return true;
    }
  }


  login(usuario: Usuario): Promise<any> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(
      usuario.email, usuario.clave);
  }




  getCurrentUserId(): string {
    return this.angularFireAuth.auth.currentUser ? this.angularFireAuth.auth.currentUser.uid : null;
  }

  getCurrentUserMail(): string {
    return this.angularFireAuth.auth.currentUser.email;
  }

  // Sign up with email/password
  async SignUp(usuario: Usuario) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(usuario.email, usuario.clave)
      .then((result) => {
        console.log("Se registró con éxito");
        this.route.navigate(['login']);
        console.log(result.user)
      }).catch((error) => {
        console.log(error.message)
      })
  }

  SignOut() {
    this.angularFireAuth.auth.signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }
}