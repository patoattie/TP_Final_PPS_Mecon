import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Usuario } from '../clases/usuario';
import { AuthService } from '../servicios-mecha/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../servicios-mecha/usuario.service';

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


  constructor(private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, private screenOrientation: ScreenOrientation, public authservicio: AuthService, public usuarioServicio: UsuarioService) {
    this.formulario = this.formBuilder.group(
      {
        correo: ['', Validators.compose([Validators.email, Validators.required])],
        clave: ['', Validators.compose([Validators.minLength(6), Validators.required])]
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

  public getError(form:any,controlName: string): string {
    let error:any;
    let mse="";
    const control = form.get(controlName);
    if (control.touched && control.errors != null) {
      console.info(JSON.stringify(control.errors));
      error = JSON.parse(JSON.stringify(control.errors));
      if(error.required){
        mse="Campo requerido.";
      }
      if(error.minlength != undefined){
        mse ="Error en logintud mínima requerida.";
      }
      if(error.maxlength != undefined){
        mse ="Error en la longitud máxima.";
      }

      if(error.pattern != undefined){
        mse ="Error en el tipo de dato.";
      }
    }
    return mse;
  }


  login() {

     if (this.formulario.valid) {

      this.usuario.email = this.formulario.value.correo;
      this.usuario.clave = this.formulario.value.clave;

      this.spinner = true;
      this.authservicio.usuarioLoguiado = new Usuario();
      this.authservicio.login(this.usuario).then(() => {
        setTimeout(() => {
          this.usuarioServicio.buscarUsuarioPorEmail(this.usuario.email).subscribe(usuarios => {
            this.authservicio.usuarioLoguiado = usuarios[0];
            this.spinner = false;
            console.log(this.authservicio.usuarioLoguiado.perfil);
            if (this.authservicio.usuarioLoguiado == undefined) {
              swal("Error", "Usuario no encontrado", "error");
            } else {
              this.router.navigate(['/principal']);
            }

          })
        }, 1500);
      });

     }

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



