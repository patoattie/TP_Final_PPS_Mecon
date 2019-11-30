import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Usuario } from '../clases/usuario';
import { AuthService } from '../servicios-mecha/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../servicios-mecha/usuario.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  spinner = true;
  usuario: Usuario = new Usuario();
  private ok: boolean; //Login OK
  private error: boolean; //Login fallido
  public formulario: FormGroup;
  private errorDatos: boolean; //Error en el formato de datos de correo o clave
  private enEspera: boolean; //Muestra u oculta el spinner
  invitado: boolean;
  formularioInvitado: FormGroup;


  constructor(private fb: Facebook, private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, private screenOrientation: ScreenOrientation, public authservicio: AuthService, public usuarioServicio: UsuarioService) {
    this.formulario = this.formBuilder.group(
      {
        correo: ['', Validators.compose([Validators.email, Validators.required])],
        clave: ['', Validators.compose([Validators.minLength(6), Validators.required])],
         });

    this.formularioInvitado = this.formBuilder.group(
        {
          correo: ['', Validators.compose([Validators.email, Validators.required])],
          nombre: ['', Validators.compose([Validators.minLength(2), Validators.required])]
        });
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
        console.log('lock');
      });
    } catch (e) {
      console.warn('No cordova.js');
    }

    this.loading();

  }


  loading() {
    this.ok = false;
    this.error = false;
    this.errorDatos = false;
    this.enEspera = false;

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.spinner = false;
    }, 3000);

  }

  public getError(form: any, controlName: string): string {
    let error: any;
    let mse = "";
    const control = form.get(controlName);
    if (control.touched && control.errors != null) {
      console.info(JSON.stringify(control.errors));
      error = JSON.parse(JSON.stringify(control.errors));
      if (error.required) {
        mse = "Campo requerido.";
      }
      if (error.minlength != undefined) {
        mse = "Error en logintud mínima requerida.";
      }
      if (error.maxlength != undefined) {
        mse = "Error en la longitud máxima.";
      }

      if (error.pattern != undefined) {
        mse = "Error en el tipo de dato.";
      }
    }
    return mse;
  }


  login() {

    if (this.invitado) {
      this.authservicio.usuarioLoguiado.perfil = "anonimo";
      this.authservicio.usuarioLoguiado.nombre = this.usuario.nombre;
      this.authservicio.usuarioLoguiado.email = this.usuario.email;
      this.invitado = false;
      this.router.navigate(['/principal']);
    } else {

    this.authservicio.usuarioLoguiado.perfil = "";

    if (this.formulario.valid || this.formularioInvitado.valid ) {

      this.usuario.email = this.formulario.value.correo;
      this.usuario.clave = this.formulario.value.clave;

      this.spinner = true;
      this.authservicio.usuarioLoguiado = new Usuario();
      this.authservicio.usuarioLoguiado.perfil = "";
      this.authservicio.login(this.usuario).then(() => {

        this.usuarioServicio.buscarUsuarioPorEmail(this.usuario.email).subscribe(usuarios => {
          if (usuarios[0] != undefined) {
            this.authservicio.usuarioLoguiado = usuarios[0];
            this.spinner = false;
          }

          console.info(usuarios[0]);
          if (this.authservicio.usuarioLoguiado.perfil == "") {
            swal("Error", "Usuario y/o clave inválidos", "error");
            this.spinner = false;
          } else {
            this.router.navigate(['/principal']);
          }

        }, (err) => {

          swal("Error", "Usuario no encontrado", "error");
          this.spinner = false;
          console.log("usuario ni encontrado en base", err);

        });

      }, (err) => {

        swal("Error", "Usuario no encontrado en Auth", "error");
        this.spinner = false;
        console.log("usuario ni encontrado", err);

      });

    }

  }

  }

  invitadotrue(){
    this.invitado = true;
   
  }

  mensajeRegistro() {
   

    let soy = {
      buttons: ["Soy cliente", "Soy empleado"],
    }
    swal("Todavía no estás registrado?", soy)
      .then((value) => {

        console.info(value);
        switch (value) {
          case null:
            swal("Ingresa desde el boton Cliente Invitado, luego podrás registrarte y acceder a veneficios");

            break;
          case true:
            swal("No tienes permisos para ingresar, contactarse con Administrador");
            break;

        }
      });

  }




  fblogin() {

    

      this.authservicio.usuarioLoguiado.perfil = "";

      this.fb.login(['public_profile', 'email'])
        .then((res: FacebookLoginResponse) => {
          console.log('Logged into Facebook!', res);
          this.fb.api("/me?fields=id,name,email", ["public_profile", "email"])
            .then((res) => {
              setTimeout(() => {

                this.usuarioServicio.buscarUsuarioPorEmail(res.email).subscribe(usuarios => {
                  if (usuarios[0] != undefined) {
                    this.authservicio.usuarioLoguiado = usuarios[0];
                    this.spinner = false;
                  }  if (this.authservicio.usuarioLoguiado.perfil == "") {
                    this.mensajeRegistro();
                    this.spinner = false;
                  } else {
                    this.router.navigate(['/principal']);
                  }

                }, (err) => {
                  swal("Error", "Usuario no encontrado", "error");
                  this.spinner = false;
                  console.log("usuario ni encontrado en base", err);

                });
              }, 10);
              console.log("email", res.email)
            }
            );
        }

        )
        .catch(e => console.log('Error logging into Facebook', e));


      this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);


    


  }





  public getOk(): boolean {
    return this.ok;
  }

  public getErrorDatos(): boolean {
    return this.errorDatos;
  }

  public getEnEspera(): boolean {
    return this.enEspera;
  }

}


