import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../servicios/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit 
{
  spinner=true;
  usuario: {nombre:string, clave:string};
  private ok: boolean; //Login OK
  private error: boolean; //Login fallido
  public formulario: FormGroup;
  private errorDatos: boolean; //Error en el formato de datos de correo o clave
  private enEspera: boolean; //Muestra u oculta el spinner

  constructor(
    private screenOrientation: ScreenOrientation, 
    private formBuilder: FormBuilder, 
    public authService: AuthService)
  {
    try {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT).then(() => {
        console.log('lock');
      });
    } catch (e) {
      console.warn('No cordova.js');
    }

    this.formulario = this.formBuilder.group(
    {
      correo: ['', Validators.compose([Validators.email, Validators.required])],
      clave: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

    this.loading();
    this.usuario = {nombre:"nombre", clave:"123456"};
  }

  ngOnInit()
  {
    this.ok = false;
    this.error = false;
    this.errorDatos = false;
    this.enEspera = false;
  }

  loading(){

    setTimeout(() => {    //<<<---    using ()=> syntax
      this.spinner=false;
    
  }, 5000);

  }

  public getOk(): boolean
  {
    return this.ok;
  }

  public getError(): boolean
  {
    return this.error;
  }

  public getErrorDatos(): boolean
  {
    return this.errorDatos;
  }

  public getEnEspera(): boolean
  {
    return this.enEspera;
  }

  public async login(): Promise<void>
  {
    let usuarioValido: boolean;
    this.enEspera = true; //Muestro el spinner

    if(this.formulario.valid)
    {
      //usuarioValido = this.verificarUsuario(); //Lo depreco
      await this.authService.SignIn(this.formulario.value.correo, this.formulario.value.clave);
      usuarioValido = this.authService.isLoggedIn();
      this.error = !usuarioValido;
      this.ok = usuarioValido;
      this.errorDatos = false;
      /*if(usuarioValido)
      {
        this.completarUsuario('blanquear');
      }*/
    }
    else
    {
      this.error = false;
      this.ok = false;
      this.errorDatos = true;
    }

    this.enEspera = false; //Oculto el spinner
  }
}


