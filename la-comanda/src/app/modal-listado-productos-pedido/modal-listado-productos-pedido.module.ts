import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalListadoProductosPedidoPage } from './modal-listado-productos-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ModalListadoProductosPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalListadoProductosPedidoPage]
})
export class ModalListadoProductosPedidoPageModule {}
