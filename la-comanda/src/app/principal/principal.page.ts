import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios-mecha/auth.service';
import { UsuarioService } from '../servicios-mecha/usuario.service';
import { FcmService } from '../servicios-mecha/fcm.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  perfil:string = '';
  registrado:boolean;
  constructor(public servicioAuth: AuthService, public usuarioservicio: UsuarioService, public fcm: FcmService) { }

  ngOnInit() {
    console.log("sin perfil", this.servicioAuth.usuarioLoguiado.perfil);
    this.perfil= this.servicioAuth.usuarioLoguiado.perfil;
   
  }

}
