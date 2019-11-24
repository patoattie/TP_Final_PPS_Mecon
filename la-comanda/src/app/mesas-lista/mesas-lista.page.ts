import { Component, OnInit } from '@angular/core';
import { Mesa } from '../clases/mesa';
import { Vibration } from '@ionic-native/vibration/ngx';
import { MesaService } from '../servicios-mecha/mesa.service';

@Component({
  selector: 'app-mesas-lista',
  templateUrl: './mesas-lista.page.html',
  styleUrls: ['./mesas-lista.page.scss'],
})
export class MesasListaPage implements OnInit {

  mesas: Mesa[] = [];
 
  constructor(private vibration: Vibration, public mesaServicio: MesaService) { }

  ngOnInit() {
    
    this.traerTodasMesas();
    /*  this.mesaServicio.traerUnaMesa('mesa_3').subscribe(mesa => {
        console.log(mesa.numero);
     });
     */
   // this.traerMesa(3);
  }


  traerTodasMesas(){
  this.mesaServicio.traerTodasMesas()
  .subscribe(mesas => {
    this.mesas = mesas;
    // console.log(this.mesas[0].numero);
  });
}

tomar(mesa: Mesa){
  this.mesaServicio.TomarMesa(mesa);
}

liberar(mesa: Mesa){
  this.mesaServicio.LiberarMesa(mesa);
}

}
