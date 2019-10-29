import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { CabeceraComponent } from "../cabecera/cabecera.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit 
{
  private ok: boolean; //Login OK
  private error: boolean; //Login fallido
  public formulario: FormGroup;
  private errorDatos: boolean; //Error en el formato de datos de correo o clave
  private enEspera: boolean; //Muestra u oculta el spinner

  constructor(private formBuilder: FormBuilder, public authService: AuthService) 
  {
    this.formulario = this.formBuilder.group(
      {
        correo: ['', Validators.compose([Validators.email, Validators.required])],
        clave: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  ngOnInit() 
  {
    this.ok = false;
    this.error = false;
    this.errorDatos = false;
    this.enEspera = false;
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

  public completarUsuario(perfil: string): void
  {
    switch(perfil)
    {
      case 'supervisor':
        this.formulario.setValue({correo: 'supervisor@nose.com', clave: '123456'});
        break;
      case 'empleado':
        this.formulario.setValue({correo: 'empleado@nose.com', clave: '123456'});
        break;
      case 'cliente':
        this.formulario.setValue({correo: 'cliente@nose.com', clave: '123456'});
        break;
      case 'dueño':
        this.formulario.setValue({correo: 'dueno@nose.com', clave: '123456'});
        break;
      default:
        this.formulario.setValue({correo: '', clave: ''});
        break;
    }
  }
}
