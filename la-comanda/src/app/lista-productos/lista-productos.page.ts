import { Component, OnInit } from '@angular/core';
import { Producto } from '../clases/producto';
import { FirebasegeneralService } from '../servicios-santi/firebasegeneral.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
  productosLista:Observable<any[]>;
  constructor(private firebaseServicios:FirebasegeneralService) {
    this.productosLista=this.firebaseServicios.getAllproducto();
    setTimeout(()=>this.productosLista.forEach((e)=>console.log(e)),5000);
   }

  ngOnInit() {
  }

}
