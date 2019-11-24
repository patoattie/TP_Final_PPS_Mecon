import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Vibration } from '@ionic-native/vibration/ngx';
import { UsuarioService } from '../servicios-mecha/usuario.service';

@Component({
  selector: 'app-pendientes-lista',
  templateUrl: './pendientes-lista.page.html',
  styleUrls: ['./pendientes-lista.page.scss'],
})
export class PendientesListaPage implements OnInit {

  clientes: any[] = [];
 
  constructor(private vibration: Vibration, public usuarioServicio: UsuarioService) { }

  ngOnInit() {
    
    this.traerTodas();
    /*  this.mesaServicio.traerUnaMesa('mesa_3').subscribe(mesa => {
        console.log(mesa.numero);
     });
     */
   // this.traerMesa(3);
  }


  traerTodas(){
  this.usuarioServicio.traerTodasPendientes()
  .subscribe(mesas => {
    this.clientes = mesas;
    // console.log(this.mesas[0].numero);
  });
}

tomar(cliente: any){
  this.usuarioServicio.TomarCliente(cliente);
}



}

